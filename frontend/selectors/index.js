import { createSelector } from 'reselect';
import { getProductById } from '@shopgate/pwa-common-commerce/product/selectors/product';
import { REDUX_NAMESPACE_RECENTLY_VIEWED_PRODUCTS } from '../constants';

/**
 * Gets the recently viewed products redux state.
 * @param {Object} state State.
 * @returns {Object}
 */
const getRecentlyViewedProductsState = state =>
  state.extensions[REDUX_NAMESPACE_RECENTLY_VIEWED_PRODUCTS];

/**
 * Gets a list of recently viewed products from the cache.
 * @param {Object} state The application state.
 * @param {number} limit The maximum number of products to return.
 * @returns {Object} The result.
 */
export const getRecentlyViewedProducts = createSelector(
  state => state,
  (state, limit) => limit,
  getRecentlyViewedProductsState,
  (state, limit, recentlyViewedProductsState) => {
    let { productIds = [] } = recentlyViewedProductsState || {};

    if (typeof limit !== 'undefined') {
      productIds = productIds.slice(0, limit);
    }

    // Collect product entities for the productIds on the list
    return productIds.reduce((list, currentId) => {
      const product = getProductById(state, currentId);
      // Take care that only products appear on the list where a product entity is available.
      if (product && product.productData) {
        list.push(product.productData);
      }

      return list;
    }, []);
  }
);
