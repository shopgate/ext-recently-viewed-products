import React from 'react';
import { connect } from 'react-redux';
import ProductsSlider from '../../components/ProductSlider';
import { getRecentlyViewedProductsWithLimit, hasMore } from '../../selectors';

/**
 * Portal position for Products Slider on PDP.
 * @returns {JSX}
 */
const CartEmptyAfter = ({ products, showMore }) => {
  return (
    <ProductsSlider
      isCartPage
      showMore={showMore}
      products={products}
    />
  );
};

const mapStateToProps = state => ({
  products: getRecentlyViewedProductsWithLimit(state),
  showMore: hasMore(state),
});

export default connect(mapStateToProps)(CartEmptyAfter);

