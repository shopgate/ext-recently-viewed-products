import { maximumHistoryEntriesPerUser, sliderLimit } from '../config';

export const PIPELINE_ADD_VIEWED_PRODUCTS = 'shopgate.user.addViewedProducts';
export const PIPELINE_GET_VIEWED_PRODUCTS = 'shopgate.user.getViewedProducts';

export const GET_VIEWED_PRODUCTS_LIMIT = maximumHistoryEntriesPerUser;
export const RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT = sliderLimit;

export const REDUX_NAMESPACE_RECENTLY_VIEWED_PRODUCTS = '@shopgate/recently-viewed-products/productList';
export const LOCAL_STORAGE_KEY_LIST = '@shopgate/recently-viewed-products@2.0.0/productList';
export const LOCAL_STORAGE_KEY_FLAG = '@shopgate/recently-viewed-products@2.0.0/isMigrated';

export const REQUEST_RECENTLY_VIEWED_PRODUCTS = 'REQUEST_RECENTLY_VIEWED_PRODUCTS';
export const RESPONSE_RECENTLY_VIEWED_PRODUCTS = 'RESPONSE_RECENTLY_VIEWED_PRODUCTS';
export const ERROR_RECENTLY_VIEWED_PRODUCTS = 'ERROR_RECENTLY_VIEWED_PRODUCTS';

export const REQUEST_ADD_RECENTLY_VIEWED_PRODUCTS = 'REQUEST_ADD_RECENTLY_VIEWED_PRODUCTS';
export const SUCCESS_ADD_RECENTLY_VIEWED_PRODUCTS = 'SUCCESS_ADD_RECENTLY_VIEWED_PRODUCTS';
export const ERROR_ADD_RECENTLY_VIEWED_PRODUCTS = 'ERROR_ADD_RECENTLY_VIEWED_PRODUCTS';
