import { connect } from 'react-redux';
import {
  getRecentlyViewedProducts,
  getPageUrl,
  isShowMoreVisible,
  isCartPage,
  isProductPage,
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
  isCartPage: isCartPage(state),
  isProductPage: isProductPage(state),
});

export default connect(mapStateToProps);
