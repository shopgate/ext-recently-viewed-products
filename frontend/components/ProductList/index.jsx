import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@shopgate/engage/core';
import NoProducts from '../../components/NoProducts';
import connect from './connector';

/**
 * Recently viewed product list
 * @param {Object[]} products Products to be displayed
 * @return {JSX}
 */
const ProductList = ({ products }) => {
  if (!products.length) {
    return <NoProducts />;
  }
  const { ProductGrid } = useTheme();
  return (
    <ProductGrid
      products={products}
      totalProductCount={products.length}
    />
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()),
};

ProductList.defaultProps = {
  products: [],
};

export default connect(ProductList);
