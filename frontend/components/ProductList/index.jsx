import React from 'react';
import PropTypes from 'prop-types';
import List from '@shopgate/pwa-common/components/List';
import ProductCard from '../../components/ProductCard';
import NoProducts from '../../components/NoProducts';
import connect from './connector';
import styles from './style';

/**
 * The ProductList component.
 * @param {Object} props The component props.
 * @param {Object} props.products A list of products to show.
 * @return {JSX}
 */
const ProductList = ({ products }) => {
  if (products.length === 0) {
    return <NoProducts />;
  }

  return (
    <div>
      <List className={styles.list} itemScope itemType="http://schema.org/ItemList" data-test-id="ProductListRecentlyViewed">
        { products.map(product => (
          <List.Item className={styles.listItem} key={product.id}>
            <ProductCard
              product={product}
              titleRows={2}
              hidePrice
            />
          </List.Item>))}
      </List>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(ProductList);