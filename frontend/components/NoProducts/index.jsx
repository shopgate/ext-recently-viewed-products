import React from 'react';
import I18n from '@shopgate/pwa-common/components/I18n';
import styles from './style';

/**
 * No products component
 * @returns {JSX.Element}
 */
const NoProducts = () => (
  <div className={styles.wrapper}>
    <I18n.Text string="recently_viewed_products.empty_product_list" />
  </div>
);

export default NoProducts;
