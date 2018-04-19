import {
  REQUEST_RECENTLY_VIEWED_PRODUCTS,
  RESPONSE_RECENTLY_VIEWED_PRODUCTS,
  ERROR_RECENTLY_VIEWED_PRODUCTS,
} from '../constants';

/**
 * Recently viewed products reducer.
 * @param {Object} state State.
 * @param {Object} action Action.
 * @returns {Object}
 */
const recentlyViewedProductsReducer = (state = {
  isFetching: false,
  productIds: [],
}, action) => {
  switch (action.type) {
    case REQUEST_RECENTLY_VIEWED_PRODUCTS:
      return {
        ...state,
        isFetching: true,
      };
    case RESPONSE_RECENTLY_VIEWED_PRODUCTS:
      return {
        ...state,
        isFetching: false,
        productIds: [
          ...action.productIds,
        ],
      };
    case ERROR_RECENTLY_VIEWED_PRODUCTS:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default recentlyViewedProductsReducer;
