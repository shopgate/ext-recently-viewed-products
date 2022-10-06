import { connect } from 'react-redux';
import { getCurrentProductId, getPageUrl } from '../../selectors';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  showMoreUrl: getPageUrl(state),
  currentProductId: getCurrentProductId(state)
});

export default connect(mapStateToProps);
