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
  LOCAL_STORAGE_KEY_LIST,
  LOCAL_STORAGE_KEY_FLAG,
} from '../constants';
import { storeInFrontend } from '../config';

/**
 * @return {Array}
 */
const getItemsFromStorage = () => JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY_LIST));
/**
 * @return {Array}
 */
const getFlagFromStorage = () => JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY_FLAG));

/**
 * @param {Array} entries entries
 */
const setItemsToStorage = (entries) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY_LIST, JSON.stringify(entries));
};
/**
 * @param {boolean} flag flag
 */
const setFlagToStorage = (flag) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY_FLAG, JSON.stringify(flag));
};

/**
 * @param {Array} currentIds currentIds
 * @param {Array} newIds newIds
 * @return {Array}
 */
const mergeProductIds = (currentIds, newIds) => Array.from(new Set([...newIds, ...currentIds]))
  .filter(Boolean)
  .slice(0, GET_VIEWED_PRODUCTS_LIMIT);

/**
 * @param {Array} productIds productIds
 * @param {Object} state state
 * @param {Function} dispatch dispatch
 * @return {Promise}
 */
const fetchMissingProducts = async (productIds, state, dispatch) => {
  // Collect the productIds where no product entity is available within the store
  // Also check if the product is expired (expires === 0)
  const missingProductsIds = productIds.filter((id) => {
    const matchedProduct = getProductById(state, { productId: id });
    return !getProductById(state, { productId: id }) || matchedProduct.expires === 0;
  });
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
 * @return {Function} A redux thunk.
 */
export const fetchRecentlyViewedProducts = () =>
  async (dispatch, getState) => {
    dispatch(requestRecentlyViewedProducts());

    let needsMigration = false;

    if (storeInFrontend) {
      needsMigration = getFlagFromStorage() === null;

      // We haven't moved the data from backend to frontend yet.
      // So we have to call the pipeline first and store the data from there
      if (!needsMigration) {
        const productIds = getItemsFromStorage();
        await fetchMissingProducts(productIds, getState(), dispatch);
        dispatch(receiveRecentlyViewedProducts(productIds));

        return;
      }
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
        if (storeInFrontend && needsMigration) {
          const storedProductIds = getItemsFromStorage();
          const mergedIds = mergeProductIds(productIds, storedProductIds);

          // save that the migration happened
          setFlagToStorage(true);
          setItemsToStorage(mergedIds);

          dispatch(receiveRecentlyViewedProducts(mergedIds));

          return;
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

  if (storeInFrontend) {
    const currentEntries = getItemsFromStorage();
    const mergedEntries = mergeProductIds(currentEntries, productIds);
    setItemsToStorage(mergedEntries);

    dispatch(successAddRecentlyViewedProducts(productIds));
    // Fetch the updated product list
    dispatch(fetchRecentlyViewedProducts());

    // skip pipeline
    return;
  }

  new PipelineRequest(PIPELINE_ADD_VIEWED_PRODUCTS)
    .setHandleErrors(ERROR_HANDLE_SUPPRESS)
    .setInput({ productIds })
    .dispatch()
    .then(() => {
      dispatch(successAddRecentlyViewedProducts(productIds));
      // Fetch the updated product list
      dispatch(fetchRecentlyViewedProducts());
    })
    .catch((err) => {
      logger.error(err);
      dispatch(errorAddRecentlyViewedProducts(productIds, err));
    });
};
