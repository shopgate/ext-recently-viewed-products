import React from 'react';
import { useSelector } from 'react-redux';
import { useThemeComponents } from '@shopgate/engage/core/hooks';
import NoProducts from '../NoProducts';
import { getRecentlyViewedProducts } from '../../selectors';

/**
 * Recently viewed product list
 * @return {JSX}
 */
const ProductList = () => {
  const products = useSelector(getRecentlyViewedProducts);
  const { ProductGrid } = useThemeComponents();

  if (!products.length) {
    return <NoProducts />;
  }

  return (
    <ProductGrid
      products={products}
      totalProductCount={products.length}
    />
  );
};

export default ProductList;
