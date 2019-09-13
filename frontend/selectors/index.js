import { createSelector } from 'reselect';
import { QUICKLINKS_MENU } from '@shopgate/pwa-common/constants/MenuIDs';
import { getProducts, getBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';
import { getMenuById } from '@shopgate/pwa-common/selectors/menu';
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
 * @returns {Array} The result.
 */
export const getRecentlyViewedProducts = createSelector(
  getProducts,
  getRecentlyViewedProductsState,
  (productsById, recentlyViewedProductsState) => {
    const { productIds = [] } = recentlyViewedProductsState || {};
    // Collect product entities for the productIds on the list
    return productIds
      .reduce((list, currentId) => {
        const product = productsById[currentId];
        if (!product || !product.productData) {
          return list;
        }
        list.push(product.productData);

        return list;
      }, [])
      // Makes sure there are no variants shown.
      .filter(product => !product.baseProductId);
  }
);

/**
 * Gets a list of recently viewed productIds filtered to ensure full products are cached.
 * @param {Object} state The application state.
 * @param {number} limit The maximum number of products to return.
 * @returns {string[]} The result.
 */
export const getRecentlyViewedProductsIds = createSelector(
  getRecentlyViewedProducts,
  (products = []) => products.map(product => product.id)
);

/**
 * Gets recently viewed products with configured limit.
 * @returns {string[]}
 */
export const getRecentlyViewedProductIdsWithLimit = createSelector(
  getRecentlyViewedProductsIds,
  productIds => productIds.slice(0, RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT)
);

/**
 * Checks if there products above the limit.
 * @returns {bool}
 */
export const hasMore = createSelector(
  getRecentlyViewedProductsIds,
  productIds => productIds.length > RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT
);

/**
 * Gets recently viewed products without product given via props.
 * @returns {string[]}
 */
export const getRecentlyViewedProductIdsForProduct = createSelector(
  getBaseProductId,
  getRecentlyViewedProductsIds,
  /**
   * Take care that only products appear on the list where a product entity is available and
   * the product is not the current shown product.
   * @param {string} baseProductId Base product id.
   * @param {string[]} recentlyViewedProductIds Products.
   * @returns {string[]}
   */
  (baseProductId, recentlyViewedProductIds) => recentlyViewedProductIds
    .filter(recentlyViewedProductId => recentlyViewedProductId !== baseProductId)
);

/**
 * Gets recently viewed products without product given via props with configured limit.
 * @returns {Array}
 */
export const getRecentlyViewedProductIdsForProductWithLimit = createSelector(
  getRecentlyViewedProductIdsForProduct,
  productIds => productIds.slice(0, RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT)
);
/**
 * Checks if for given product there are more recently viewed products.
 * @returns {bool}
*/
export const hasMoreForProduct = createSelector(
  getRecentlyViewedProductIdsForProduct,
  productIds => productIds.length > RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT
);

/**
 * Returns the url of the page on which the recently viewed products list is supposed to be shown.
 * @param {Object} state State.
 * @return {string|null}
 */
export const getPageUrl = (state) => {
  // Check if quicklinks are available.
  const quicklinks = (getMenuById(state, { id: QUICKLINKS_MENU }) || []);
  // Search for an entry with the expected url.
  const { url: pageUrl = null } = quicklinks.find(({ url }) => url.endsWith(pageId)) || {};
  return pageUrl;
};
