import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Slider from '@shopgate/pwa-common/components/Slider';
import Card from '../Card';
import ProductCard from '../ProductCard';
import connect from './connector';
import styles from './style';

/**
 * Creates an item for a single product.
 * @param {Object} product The product data.
 * @return {JSX} The rendered product card.
 */
const createSliderItem = (product) => {
  const key = `s${product.id}`;
  return (
    <Slider.Item key={key} className={styles.sliderItem}>
      <Card className={styles.card}>
        <ProductCard
          product={product}
          titleRows={2}
          hidePrice
        />
      </Card>
    </Slider.Item>
  );
};

/**
 * The RecentlyViewedProducts component
 * @return {JSX}
 */
const RecentlyViewedProducts = ({ products }) => {
  const items = products.map((
    product => createSliderItem(product)
  ));

  if (!items.length) {
    return null;
  }
  // TODO: when it would be shown in a different place than cart
  // Use styles.headline and recently_viewed_products.headline as defaults
  // Finally, build the slider.
  return (
    <div className={styles.slider}>
      <h3 className={styles.headlineCart}>
        <I18n.Text string="recently_viewed_products.empty_cart_headline" />
      </h3>
      <Slider
        loop={false}
        indicators={false}
        controls={false}
        snapItems={false}
        slidesPerView={2.3}
        classNames={{ container: styles.sliderContainer }}
      >
        {items}
      </Slider>
    </div>
  );
};

RecentlyViewedProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()),
};

RecentlyViewedProducts.defaultProps = {
  products: [],
};

export default connect(RecentlyViewedProducts);
