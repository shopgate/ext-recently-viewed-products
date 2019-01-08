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
} from '../constants';

/**
 * Dispatches a getViewedProducts pipeline request.
 * @return {Function} A redux thunk.
 */
export const fetchRecentlyViewedProducts = () => (dispatch, getState) => {
  dispatch(requestRecentlyViewedProducts());

  new PipelineRequest(PIPELINE_GET_VIEWED_PRODUCTS)
    .setHandleErrors(ERROR_HANDLE_SUPPRESS)
    .setInput({
      limit: GET_VIEWED_PRODUCTS_LIMIT,
      offset: 0,
    })
    .dispatch()
    .then(async (response) => {
      const state = getState();
      const { productIds } = response;

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
