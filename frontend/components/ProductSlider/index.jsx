import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Slider from '@shopgate/pwa-common/components/Slider';
import ButtonLink from '@shopgate/pwa-ui-shared/ButtonLink';
import { showOnPdpPage, showOnEmptyCartPage } from '../../config';
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
 */
class ProductSlider extends Component {
  static propTypes = {
    autoPlay: PropTypes.bool,
    headline: PropTypes.string,
    isCartPage: PropTypes.bool,
    isProductPage: PropTypes.bool,
    products: PropTypes.arrayOf(PropTypes.shape()),
    showMore: PropTypes.bool,
    showMoreUrl: PropTypes.string,
  };

  static defaultProps = {
    autoPlay: false,
    products: [],
    showMore: false,
    showMoreUrl: null,
    isCartPage: false,
    isProductPage: false,
    headline: null,
  };

  /**
   * Should component update given the new props?
   * @param {Object} nextProps The next component props.
   * @return {boolean} Update or not.
   */
  shouldComponentUpdate(nextProps) {
    if (nextProps.isCartPage !== this.props.isCartPage) {
      return true;
    }

    if (nextProps.isProductPage !== this.props.isProductPage) {
      return true;
    }

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
    if (this.props.isCartPage && !showOnEmptyCartPage) {
      return null;
    }

    if (this.props.isProductPage && !showOnPdpPage) {
      return null;
    }

    const items = this.props.products.map((
      product => createSliderItem(product)
    ));

    if (!items.length) {
      return null;
    }

    let headline = 'recently_viewed_products.headline';

    if (this.props.isCartPage) {
      headline += '_cart';
    }

    const hasShowMore = this.props.showMore && this.props.showMoreUrl;
    return (
      <div className={styles.slider}>
        <div className={styles.headlineContainer}>
          <h3 className={styles.headline(hasShowMore)}>
            <I18n.Text string={this.props.headline ? this.props.headline : headline} />
          </h3>
          { hasShowMore && (
            <div className={styles.showMoreContainer}>
              <ButtonLink href={this.props.showMoreUrl} noGap>
                <I18n.Text string="recently_viewed_products.show_more" />
              </ButtonLink>
            </div>
          )}
        </div>

        <Slider
          autoPlay={this.props.autoPlay}
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
  }
}

export default connect(ProductSlider);
