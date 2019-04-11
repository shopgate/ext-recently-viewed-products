import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductsSlider from '../../components/ProductSlider';
import { getRecentlyViewedProductsWithLimit, hasMore } from '../../selectors';

/**
 * Portal position for Products Slider on PDP.
 * @params {Array} products Products collection.
 * @params {bool} showMore Whether to show more button (products.length > totalCount)
 * @returns {JSX}
 */
const Widget = ({ products, showMore, settings }) => (
  <ProductsSlider
    showMore={showMore}
    products={products}
    headline={settings.headline}
    autoPlay={settings.autoPlay}
  />
);

Widget.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
  products: getRecentlyViewedProductsWithLimit(state),
  showMore: hasMore(state),
});

export default connect(mapStateToProps)(Widget);

