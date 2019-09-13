import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductsSlider from '../../components/ProductSlider';
import { getRecentlyViewedProductIdsWithLimit, hasMore } from '../../selectors';

/**
 * Portal position for Products Slider on PDP.
 * @params {string[]} productIds Product id collection.
 * @params {bool} showMore Whether to show more button (products.length > totalCount)
 * @returns {JSX}
 */
const Widget = ({ productIds, showMore, settings }) => (
  <ProductsSlider
    showMore={showMore}
    productIds={productIds}
    headline={settings.headline}
    autoPlay={settings.autoPlay}
  />
);

Widget.propTypes = {
  productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  showMore: PropTypes.bool.isRequired,
  settings: PropTypes.shape({}),
};

Widget.defaultProps = {
  settings: {},
};

/**
 * Maps state to props.
 * @param {Object} state State.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  productIds: getRecentlyViewedProductIdsWithLimit(state),
  showMore: hasMore(state),
});

export default connect(mapStateToProps)(Widget);

