import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withPageProductId } from '@shopgate/pwa-extension-kit/connectors';
import { getRecentlyViewedForProductWithLimit, hasMoreForProduct } from '../../selectors';
import ProductsSlider from '../../components/ProductSlider';

/**
 * Portal position for Products Slider on PDP.
 * @param {string} productId Product Id from route.
 * @param {Array} products Products collection.
 * @param {bool} showMore Whether to show more button.
 * @returns {JSX}
 */
const PDPReviewsAfter = ({ products, showMore }) => (
  <ProductsSlider
    isProductPage
    showMore={showMore}
    products={products}
  />
);

PDPReviewsAfter.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showMore: PropTypes.bool.isRequired,
};

/**
 * Maps state to props.
 * @param {Object} state State
 * @param {Object} props Props.
 * @returns {Object}
 */
const mapStateToProps = (state, props) => ({
  products: getRecentlyViewedForProductWithLimit(state, props),
  showMore: hasMoreForProduct(state, props),
});

export default withPageProductId(connect(mapStateToProps)(PDPReviewsAfter));

