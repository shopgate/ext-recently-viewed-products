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
const CartEmptyAfter = ({ products, showMore }) => (
  <ProductsSlider
    isCartPage
    showMore={showMore}
    products={products}
  />
);

CartEmptyAfter.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showMore: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps)(CartEmptyAfter);

