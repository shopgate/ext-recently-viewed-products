import {
  REQUEST_RECENTLY_VIEWED_PRODUCTS,
  RESPONSE_RECENTLY_VIEWED_PRODUCTS,
  ERROR_RECENTLY_VIEWED_PRODUCTS,
} from '../constants';

/**
 * The request recently viewed products action.
 * @returns {Object}
 */
export const requestRecentlyViewedProducts = () => ({
  type: REQUEST_RECENTLY_VIEWED_PRODUCTS,
});

/**
 * The response recently viewed products action.
 * @param {Array} productIds The ids of the products that are on the list.
 * @returns {Object}
 */
export const receiveRecentlyViewedProducts = (productIds = []) => ({
  type: RESPONSE_RECENTLY_VIEWED_PRODUCTS,
  productIds,
});

  /**
 * The error recently viewed products action.
 * @returns {Object}
 */
export const errorRecentlyViewedProducts = () => ({
  type: ERROR_RECENTLY_VIEWED_PRODUCTS,
});
