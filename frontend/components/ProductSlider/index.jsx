import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Slider from '@shopgate/pwa-common/components/Slider';
import ButtonLink from '@shopgate/pwa-ui-shared/ButtonLink';
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
          hideRating
        />
      </Card>
    </Slider.Item>
  );
};

/**
 * The ProductSlider component
 * @return {JSX}
 */
const ProductSlider = ({
  products, showMore, showMoreUrl, isCartPage,
}) => {
  const items = products.map((
    product => createSliderItem(product)
  ));

  if (!items.length) {
    return null;
  }

  let headline = 'recently_viewed_products.headline';

  if (isCartPage) {
    headline += '_cart';
  }

  return (
    <div className={styles.slider}>
      <div className={styles.headlineContainer}>
        <h3 className={styles.headline}>
          <I18n.Text string={headline} />
        </h3>
        { showMore && (
          <div className={styles.showMoreContainer}>
            <ButtonLink href={showMoreUrl} noGap>
              <I18n.Text string="recently_viewed_products.show_more" />
            </ButtonLink>
          </div>
        )}
      </div>

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

ProductSlider.propTypes = {
  isCartPage: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()),
  showMore: PropTypes.bool,
  showMoreUrl: PropTypes.string,
};

ProductSlider.defaultProps = {
  products: [],
  showMore: false,
  showMoreUrl: null,
};

export default connect(ProductSlider);
