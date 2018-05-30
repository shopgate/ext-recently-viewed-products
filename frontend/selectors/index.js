import { createSelector } from 'reselect';
import { getMenuById } from '@shopgate/pwa-common/selectors/menu';
import { QUICKLINKS_MENU } from '@shopgate/pwa-common/constants/MenuIDs';
import { getProductById } from '@shopgate/pwa-common-commerce/product/selectors/product';
import {
  REDUX_NAMESPACE_RECENTLY_VIEWED_PRODUCTS,
  RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT,
} from '../constants';
import { pageId } from '../config';

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

/**
 * Returns the url of the page on which the recently viewed products list is supposed to be shown.
 * @param {Object} state State.
 * @return {string|null}
 */
export const getPageUrl = (state) => {
  // Check if quicklinks are available.
  const quicklinks = (getMenuById(state, QUICKLINKS_MENU).entries || []);
  // Search for an entry with the expected url.
  const { url: pageUrl = null } = quicklinks.find(({ url }) => url.endsWith(pageId)) || {};
  return pageUrl;
};

/**
 * Checks if the show more button of the recently viewed products slider is supposed to be shown.
 * @param {Object} state State.
 * @return {boolean}
 */
export const isShowMoreVisible = createSelector(
  getPageUrl,
  getRecentlyViewedProducts,
  (url, products) => !!(url && products.length > RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT)
);
