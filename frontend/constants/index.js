import { maximumHistoryEntriesPerUser } from '../config';

export const PIPELINE_ADD_VIEWED_PRODUCTS = 'shopgate.user.addViewedProducts';
export const PIPELINE_GET_VIEWED_PRODUCTS = 'shopgate.user.getViewedProducts';

export const GET_VIEWED_PRODUCTS_LIMIT = maximumHistoryEntriesPerUser;
export const RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT = 10;

export const REDUX_NAMESPACE_RECENTLY_VIEWED_PRODUCTS = '@shopgate/recently-viewed-products/productList';

export const REQUEST_RECENTLY_VIEWED_PRODUCTS = 'REQUEST_RECENTLY_VIEWED_PRODUCTS';
export const RESPONSE_RECENTLY_VIEWED_PRODUCTS = 'RESPONSE_RECENTLY_VIEWED_PRODUCTS';
export const ERROR_RECENTLY_VIEWED_PRODUCTS = 'ERROR_RECENTLY_VIEWED_PRODUCTS';

export const TRAMPOLINE_PATH = '/trampoline';
