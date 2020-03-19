import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@shopgate/engage/core';
import { I18n, ButtonLink } from '@shopgate/engage/components';
import getConfig from '../../helpers/getConfig';
import connect from './connector';
import styles from './style';

const { showOnPdpPage, showOnEmptyCartPage } = getConfig();

/**
 * Recently viewed ProductSlider
 * @param {boolean} isCartPage Indicates if current page is cart
 * @param {boolean} isProductPage Indicates if current page is PDP
 * @param {boolean} showMore Indicates is showMore link should be displayed when applicable
 * @param {string[]} productIds Array of product ids
 * @param {string} showMoreUrl Path to show more page
 * @param {string} headline Headline for Product slider
 * @return {JSX}
 */
const ProductSlider = ({
  isCartPage,
  isProductPage,
  showMore,
  productIds,
  showMoreUrl,
  headline,
}) => {
  if (isCartPage && !showOnEmptyCartPage) {
    return null;
  }

  if (isProductPage && !showOnPdpPage) {
    return null;
  }

  if (!productIds.length) {
    return null;
  }

  const { ProductSlider: BaseProductSlider } = useTheme();

  let defaultHeadline = 'recently_viewed_products.headline';

  if (isCartPage) {
    defaultHeadline += '_cart';
  }

  const hasShowMore = showMore && showMoreUrl;

  return (
    <div className={styles.slider}>
      <div className={styles.headlineContainer}>
        <h3 className={styles.headline(hasShowMore)}>
          <I18n.Text string={headline || defaultHeadline} />
        </h3>
        {hasShowMore && (
          <div className={styles.showMoreContainer}>
            <ButtonLink href={showMoreUrl} noGap>
              <I18n.Text string="recently_viewed_products.show_more" />
            </ButtonLink>
          </div>
        )}
      </div>
      <BaseProductSlider
        productIds={productIds}
        autoplay
        delay={7000}
        snap={false}
      />
    </div>
  );
};

ProductSlider.propTypes = {
  headline: PropTypes.string,
  isCartPage: PropTypes.bool,
  isProductPage: PropTypes.bool,
  productIds: PropTypes.arrayOf(PropTypes.string),
  showMore: PropTypes.bool,
  showMoreUrl: PropTypes.string,
};

ProductSlider.defaultProps = {
  headline: null,
  isCartPage: false,
  isProductPage: false,
  productIds: [],
  showMore: false,
  showMoreUrl: null,
};

export default connect(ProductSlider);
