import { createSelector } from 'reselect';
import { getMenuById } from '@shopgate/pwa-common/selectors/menu';
import { QUICKLINKS_MENU } from '@shopgate/pwa-common/constants/MenuIDs';
import { getCurrentPathname } from '@shopgate/pwa-common/selectors/router';
import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';
import { ITEM_PATTERN } from '@shopgate/pwa-common-commerce/product/constants';
import { getProducts, getProductIdFromRoute } from '@shopgate/pwa-common-commerce/product/selectors/product';
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
  getProducts,
  (state, limit) => limit,
  getRecentlyViewedProductsState,
  getProductIdFromRoute,
  (productsById, limit, recentlyViewedProductsState, currentBaseProductId) => {
    let { productIds = [] } = recentlyViewedProductsState || {};

    if (typeof limit !== 'undefined') {
      // Take here one product more then limit in case it might be the current product
      productIds = productIds.slice(0, limit + 1);
    }

    // Collect product entities for the productIds on the list
    return productIds.reduce((list, currentId) => {
      const product = productsById[currentId];

      /**
       * Take care that only products appear on the list where a product entity is available and
       * the product is not the current shown product.
       */
      if (product && product.productData && currentBaseProductId !== currentId) {
        list.push(product.productData);
      }

      return list;
    }, []).slice(0, limit);
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

export const isCartPage = createSelector(
  getCurrentPathname,
  pathname => pathname === CART_PATH
);

export const isProductPage = createSelector(
  getCurrentPathname,
  pathname => pathname === ITEM_PATTERN
);
