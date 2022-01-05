import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { ERROR_HANDLE_SUPPRESS } from '@shopgate/pwa-core/constants/ErrorHandleTypes';
import { getProductById } from '@shopgate/pwa-common-commerce/product/selectors/product';
import getProducts from '@shopgate/pwa-common-commerce/product/actions/getProducts';
import { logger } from '@shopgate/pwa-core/helpers';
import {
  requestRecentlyViewedProducts,
  receiveRecentlyViewedProducts,
  errorRecentlyViewedProducts,
  requestAddRecentlyViewedProducts,
  successAddRecentlyViewedProducts,
  errorAddRecentlyViewedProducts,
} from '../action-creators';
import {
  PIPELINE_GET_VIEWED_PRODUCTS,
  PIPELINE_ADD_VIEWED_PRODUCTS,
  GET_VIEWED_PRODUCTS_LIMIT,
  LOCALSTORAGE_KEY,
} from '../constants';
import { storeInFrontend } from '../config';

/**
 * @return {Array}
 */
const getItemsFromStorage = () => JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));

/**
 * @param {Array} entries entries
 */
const setItemsToStorage = (entries) => {
  window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(entries));
};

/**
 * @param {Array} productIds productIds
 * @param {Object} state state
 * @param {Function} dispatch dispatch
 * @return {Promise}
 */
const fetchMissingProducts = async (productIds, state, dispatch) => {
  // Collect the productIds where no product entity is available within the store
  const missingProductsIds = productIds.filter(id => !getProductById(state, { productId: id }));
  if (missingProductsIds.length) {
    // Fetch missing product data before the store is updated with the recently viewed list
    await dispatch(getProducts({
      includeFilters: false,
      params: {
        productIds: missingProductsIds,
      },
    }));
  }
};

/**
 * Dispatches a getViewedProducts pipeline request.
 * @param {boolean} migrateToFrontend flag if data should be moved to localstorage
 * @return {Function} A redux thunk.
 */
export const fetchRecentlyViewedProducts = (migrateToFrontend = false) =>
  async (dispatch, getState) => {
    dispatch(requestRecentlyViewedProducts());

    if (!migrateToFrontend && storeInFrontend) {
      const productIds = getItemsFromStorage();

      await fetchMissingProducts(productIds, getState(), dispatch);
      dispatch(receiveRecentlyViewedProducts(productIds));

      return;
    }

    new PipelineRequest(PIPELINE_GET_VIEWED_PRODUCTS)
      .setHandleErrors(ERROR_HANDLE_SUPPRESS)
      .setInput({
        limit: GET_VIEWED_PRODUCTS_LIMIT,
        offset: 0,
      })
      .dispatch()
      .then(async (response) => {
        const { productIds } = response;

        await fetchMissingProducts(productIds, getState(), dispatch);

        // move data to localstorage
        if (migrateToFrontend) {
          setItemsToStorage(productIds);
        }

        dispatch(receiveRecentlyViewedProducts(productIds));
      })
      .catch((err) => {
        logger.error(err);
        dispatch(errorRecentlyViewedProducts());
      });
  };

/**
 * Dispatches an addViewedProducts pipeline request.
 * @param {Array} productIds The product ids to add to the list.
 * @return {Function} A redux thunk.
 */
export const addRecentlyViewedProducts = (productIds = []) => (dispatch) => {
  dispatch(requestAddRecentlyViewedProducts(productIds));

  let migrateToFrontend = false;

  if (storeInFrontend) {
    const currentEntries = getItemsFromStorage();

    if (currentEntries === null) {
      // no existing localstorage entry -> migration needed
      migrateToFrontend = true;
    }

    // no migration needed -> skip the pipeline
    if (!migrateToFrontend) {
      const mergedEntries = Array.from(new Set([...productIds, ...currentEntries]))
        .filter(Boolean)
        .slice(0, GET_VIEWED_PRODUCTS_LIMIT);

      setItemsToStorage(mergedEntries);

      dispatch(successAddRecentlyViewedProducts(productIds));
      // Fetch the updated product list
      dispatch(fetchRecentlyViewedProducts(migrateToFrontend));

      // skip pipeline
      return;
    }
  }

  new PipelineRequest(PIPELINE_ADD_VIEWED_PRODUCTS)
    .setHandleErrors(ERROR_HANDLE_SUPPRESS)
    .setInput({ productIds })
    .dispatch()
    .then(() => {
      dispatch(successAddRecentlyViewedProducts(productIds));
      // Fetch the updated product list
      dispatch(fetchRecentlyViewedProducts(migrateToFrontend));
    })
    .catch((err) => {
      logger.error(err);
      dispatch(errorAddRecentlyViewedProducts(productIds, err));
    });
};
