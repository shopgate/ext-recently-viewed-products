import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@shopgate/pwa-common/components/List';
import ProductCard from '../../components/ProductCard';
import NoProducts from '../../components/NoProducts';
import connect from './connector';
import styles from './style';

/**
 * The ProductList component.
 */
class ProductList extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  /**
   * Should component update given the new props?
   * @param {Object} nextProps The next component props.
   * @return {boolean} Update or not.
   */
  shouldComponentUpdate(nextProps) {
    if (nextProps.products.length !== this.props.products.length) {
      return true;
    }

    return this.props.products.every(({ id }, index) => id !== nextProps.products[index].id);
  }

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    if (this.props.products.length === 0) {
      return <NoProducts />;
    }

    return (
      <div>
        <List className={styles.list} itemScope itemType="http://schema.org/ItemList" data-test-id="ProductListRecentlyViewed">
          { this.props.products.map(product => (
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
  }
}

export default connect(ProductList);
