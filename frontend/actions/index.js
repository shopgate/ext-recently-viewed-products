import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { getProductById } from '@shopgate/pwa-common-commerce/product/selectors/product';
import getProducts from '@shopgate/pwa-common-commerce/product/actions/getProducts';
import { logger } from '@shopgate/pwa-core/helpers';
import {
  requestRecentlyViewedProducts,
  receiveRecentlyViewedProducts,
  errorRecentlyViewedProducts,
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
    .setInput({
      limit: GET_VIEWED_PRODUCTS_LIMIT,
      offset: 0,
    })
    .dispatch()
    .then(async (response) => {
      // TODO refactor if the new pipeline is updated and provides only productIds
      const { products } = response;
      const productIds = products.map(({ id }) => id);
      const state = getState();
      // Collect the productIds where no product entity is available within the store
      const missingProductsIds = productIds.filter(id => !getProductById(state, id));

      if (missingProductsIds.length) {
        // Fetch missing product data before the list data is put to the store
        await dispatch(getProducts({
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
  new PipelineRequest(PIPELINE_ADD_VIEWED_PRODUCTS)
    .setInput({ productIds })
    .dispatch()
    .then(() => {
      // Fetch the updated product list
      dispatch(fetchRecentlyViewedProducts());
    })
    .catch((err) => {
      logger.error(err);
    });
};
