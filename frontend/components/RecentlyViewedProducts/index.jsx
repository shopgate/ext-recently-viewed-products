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
const createSliderItem = (product ) => {
  const key = `s${product.id}`;
  return (
    <Slider.Item key={key} className={styles.sliderItem}>
      <Card className={styles.card}>
        <ProductCard
          product={product}
          titleRows={2}
        />
      </Card>
    </Slider.Item>
  );
};

/**
 * The RecentlyViewedProducts component
 * @return {JSX}
 */
const RecentlyViewedProducts = ({ products, settings }) => {
  const { sliderSettings } = settings;

  const items = products.map((
    product => createSliderItem(product, settings)
  ));

  if (!items.length) {
    return null;
  }

  // Finally, build the slider.
  return (
    <div className={styles.slider}>
      <h3 className={styles.headline}>
        <I18n.Text string="recently_viewed_products.headline" />
      </h3>
      <Slider
        autoPlay={sliderSettings.autoPlay}
        loop={false}
        indicators={false}
        controls={false}
        interval={Number.parseInt(sliderSettings.delay, 10)}
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
  // The settings as received by the pipeline request
  settings: PropTypes.shape({
    headline: PropTypes.string,
    sliderSettings: PropTypes.shape({
      autostart: PropTypes.bool,
      delay: PropTypes.oneOfType([ // The delay between the automatic slides loops
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
    showName: PropTypes.bool,
  }),
};

RecentlyViewedProducts.defaultProps = {
  settings: {
    headline: 'Recently viewed',
    sliderSettings: {
      autostart: false,
      delay: null,
    },
    showName: false,
  },
  products: [],
};

export default connect(RecentlyViewedProducts);
