import {
  REQUEST_RECENTLY_VIEWED_PRODUCTS,
  RESPONSE_RECENTLY_VIEWED_PRODUCTS,
  ERROR_RECENTLY_VIEWED_PRODUCTS,
  REQUEST_ADD_RECENTLY_VIEWED_PRODUCTS,
  SUCCESS_ADD_RECENTLY_VIEWED_PRODUCTS,
  ERROR_ADD_RECENTLY_VIEWED_PRODUCTS,
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

/**
 * The request to add Recently viewed products.
 * @param {Array} productIds The ids of the products to add to the list.
 * @returns {Object}
 */
export const requestAddRecentlyViewedProducts = productIds => ({
  type: REQUEST_ADD_RECENTLY_VIEWED_PRODUCTS,
  productIds,
});

/**
 * The successful addition of recently viewed products.
 * @param {Array} productIds The ids of the products added to the list.
 * @returns {Object}
 */
export const successAddRecentlyViewedProducts = productIds => ({
  type: SUCCESS_ADD_RECENTLY_VIEWED_PRODUCTS,
  productIds,
});

/**
 * The error for addition of recently viewed products.
 * @param {Array} productIds The ids of the products added to the list.
 * @param {string} err The error message.
 * @returns {Object}
 */
export const errorAddRecentlyViewedProducts = (productIds, err) => ({
  type: ERROR_ADD_RECENTLY_VIEWED_PRODUCTS,
  productIds,
  err,
});
