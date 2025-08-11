import { routeDidEnter$ } from '@shopgate/pwa-common/streams';
import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import { ITEM_PATTERN } from '@shopgate/pwa-common-commerce/product/constants';
import { ACTION_PUSH } from '@virtuous/conductor';
import { hex2bin } from '@shopgate/pwa-common/helpers/data';
import { getBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';
import {
  sendDefaultLocationCodeSuccess$,
} from '@shopgate/engage/locations';
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

  subscribe(productWillEnterForward$, ({ dispatch, action, getState }) => {
    // Add the current product to the list when the product page was opened

    const productId = hex2bin(action.route.params.productId);
    if (!productId) {
      return;
    }
    const baseProductId = getBaseProductId(getState(), { productId });

    let resultProductId = productId;
    // If it is known that this product is a variant and we do have base product knowledge,
    // then dispatch that one.
    if (baseProductId && productId !== baseProductId) {
      resultProductId = baseProductId;
    }
    dispatch(addRecentlyViewedProducts([resultProductId]));
  });

  subscribe(appDidStart$, ({ dispatch }) => {
    // Initially fetch the product list at the app start
    dispatch(fetchRecentlyViewedProducts());
  });

  // Expire the recently viewed products when location is updated
  subscribe(sendDefaultLocationCodeSuccess$, ({ dispatch }) => {
    dispatch(fetchRecentlyViewedProducts());
  });
}
