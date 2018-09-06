import { connect } from 'react-redux';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';
import { ITEM_PATH } from '@shopgate/pwa-common-commerce/product/constants';
import {
  getRecentlyViewedProducts,
  getPageUrl,
  isShowMoreVisible,
} from '../../selectors';
import { RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT } from '../../constants';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  products: getRecentlyViewedProducts(state, RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT),
  showMore: isShowMoreVisible(state),
  showMoreUrl: getPageUrl(state),
  isCartPage: getHistoryPathname(state).startsWith(CART_PATH),
  isProductPage: getHistoryPathname(state).startsWith(ITEM_PATH),
});

export default connect(mapStateToProps);
