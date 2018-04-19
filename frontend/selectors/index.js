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
 * Gets a list of viewed products from the cache.
 * @param {Object} state The application state.
 * @returns {Object} The result.
 */
export const getRecentlyViewedProducts = createSelector(
  state => state,
  getRecentlyViewedProductsState,
  (state, recentlyViewedProductsState) => {
    const { productIds } = recentlyViewedProductsState || [];
    // Collect product entities for the productIds on the list
    return productIds.reduce((list, currentId) => {
      const product = getProductById(state, currentId);
      if (product && product.productData) {
        list.push(product.productData);
      }

      return list;
    }, []);
  }
);
