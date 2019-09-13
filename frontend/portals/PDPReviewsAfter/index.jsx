import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withCurrentProduct } from '@shopgate/engage/core';
import { getRecentlyViewedProductIdsForProductWithLimit, hasMoreForProduct } from '../../selectors';
import ProductsSlider from '../../components/ProductSlider';

/**
 * Portal position for Products Slider on PDP.
 * @param {string} productId Product Id from route.
 * @param {string[]} productIds Products collection.
 * @param {bool} showMore Whether to show more button.
 * @returns {JSX}
 */
const PDPReviewsAfter = ({ productIds, showMore }) => (
  <ProductsSlider
    isProductPage
    showMore={showMore}
    productIds={productIds}
  />
);

PDPReviewsAfter.propTypes = {
  productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  showMore: PropTypes.bool.isRequired,
};

/**
 * Maps state to props.
 * @param {Object} state State
 * @param {Object} props Props.
 * @returns {Object}
 */
const mapStateToProps = (state, props) => ({
  productIds: getRecentlyViewedProductIdsForProductWithLimit(state, props),
  showMore: hasMoreForProduct(state, props),
});

export default withCurrentProduct(connect(mapStateToProps)(PDPReviewsAfter));

