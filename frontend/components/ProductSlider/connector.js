import { connect } from 'react-redux';
import {
  getRecentlyViewedProducts,
  getPageUrl,
  isShowMoreVisible,
} from '../../selectors';
import { RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT } from '../../constants';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props The component properties.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  products: getRecentlyViewedProducts(state, RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT),
  showMore: isShowMoreVisible(state),
  showMoreUrl: getPageUrl(state),
});

export default connect(mapStateToProps);
