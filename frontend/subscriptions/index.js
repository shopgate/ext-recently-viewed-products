import { routeDidEnter$ } from '@shopgate/pwa-common/streams';
import { getProductIdFromRoute } from '@shopgate/pwa-common-commerce/product/selectors/product';
import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import { ITEM_PATTERN } from '@shopgate/pwa-common-commerce/product/constants';
import { ACTION_PUSH } from '@virtuous/conductor';
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
  const productWillEnterForward$ = routeDidEnter$.filter(({ action }) => (
    action.historyAction === ACTION_PUSH && action.route.pattern === ITEM_PATTERN
  ));

  subscribe(productWillEnterForward$, ({ dispatch }) => {
    // Add the current product to the list when the product page was opened
    const productId = getProductIdFromRoute();
    if (productId === null) {
      return;
    }
    dispatch(addRecentlyViewedProducts([productId]));
  });

  subscribe(appDidStart$, ({ dispatch }) => {
    // Initially fetch the product list at the app start
    dispatch(fetchRecentlyViewedProducts());
  });
}
