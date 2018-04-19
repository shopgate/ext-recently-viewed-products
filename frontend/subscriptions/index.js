import { routeDidEnter } from '@shopgate/pwa-common/streams/history';
import { getCurrentBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';
import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import { ITEM_PATH } from '@shopgate/pwa-common-commerce/product/constants';
import {
  HISTORY_PUSH_ACTION,
  HISTORY_REPLACE_ACTION,
} from '@shopgate/pwa-common/constants/ActionTypes';
import {
  addRecentlyViewedProducts,
  fetchRecentlyViewedProducts,
} from '../actions';

/**
 * The recently viewed products subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default function recentlyViewedProducts(subscribe) {
  /**
   * A new stream that emits when the product page is opened. It doesn't get active
   * when the user navigated back within the history.
   */
  const addProductToList$ = routeDidEnter(ITEM_PATH).filter((
    ({ pathname, historyAction }) =>
      !(pathname.endsWith('reviews') ||
        pathname.endsWith('reviews/') ||
        pathname.endsWith('write_review') ||
        pathname.endsWith('write_review/')) &&
      (historyAction === HISTORY_PUSH_ACTION || historyAction === HISTORY_REPLACE_ACTION)
  ));

  subscribe(addProductToList$, ({ dispatch, getState }) => {
    // Add the current product to the list when the product page was opened
    const productId = getCurrentBaseProductId(getState());
    dispatch(addRecentlyViewedProducts([productId]));
  });

  subscribe(appDidStart$, ({ dispatch }) => {
    // Initially fetch the product list at the app start
    dispatch(fetchRecentlyViewedProducts());
  });
}
