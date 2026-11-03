import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withCurrentProduct } from '@shopgate/engage/core';
import { getRecentlyViewedProductIdsForProductWithLimit, hasMoreForProduct } from '../../selectors';
import ProductsSlider from '../../components/ProductSlider';
import config from '../../config.json';

const { pdpPosition, pdpHeadline } = config;

/**
 * Portal position for Products Slider on PDP.
 * @param {string} productId Product Id from route.
 * @param {string} variantId Selected variant id.
 * @param {string} name Portal position name.
 * @returns {JSX}
 */
const PDPReviewsAfter = ({ productId, variantId, name }) => {
  const productProps = {
    productId,
    variantId,
  };
  const productIds = useSelector(
    state => getRecentlyViewedProductIdsForProductWithLimit(state, productProps)
  );
  const showMore = useSelector(state => hasMoreForProduct(state, productProps));

  if (name !== pdpPosition) {
    return null;
  }

  return (
    <ProductsSlider
      isProductPage
      showMore={showMore}
      productIds={productIds}
      headline={pdpHeadline}
    />
  );
};

PDPReviewsAfter.propTypes = {
  name: PropTypes.string.isRequired,
  productId: PropTypes.string,
  variantId: PropTypes.string,
};

PDPReviewsAfter.defaultProps = {
  productId: null,
  variantId: null,
};

export default withCurrentProduct(PDPReviewsAfter);
