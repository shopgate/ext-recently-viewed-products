import { connect } from 'react-redux';
import { getRecentlyViewedProducts } from '../../../../selectors';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props The component properties.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  products: getRecentlyViewedProducts(state),
});

export default connect(mapStateToProps);
