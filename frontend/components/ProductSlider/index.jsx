import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { I18n } from '@shopgate/engage/components';
import { Button } from '@shopgate/engage/components/v2';
import { isIOSTheme } from '@shopgate/engage/core';
import { ProductSlider as BaseProductSlider } from '@shopgate/engage/product/components';
import { makeStyles } from '@shopgate/engage/styles';
import getConfig from '../../helpers/getConfig';
import { getPageUrl } from '../../selectors';

const { showOnPdpPage, showOnEmptyCartPage } = getConfig();

const useStyles = makeStyles()(theme => ({
  slider: {
    width: '100%',
    flex: 1,
    padding: '8px 0',
  },
  headlineContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    overflow: 'hidden',
  },
  headline: {
    fontSize: isIOSTheme() ? theme.typography.h2.fontSize : theme.typography.h4.fontSize,
    width: '100%',
    margin: isIOSTheme() ? '8px 16px' : '8px 8px 8px 12px',
    padding: 0,
  },
  headlineLeft: {
    textAlign: 'left',
  },
  headlineCentered: {
    textAlign: 'center',
  },
  showMoreContainer: {
    padding: theme.spacing(1, 2),
    '& button': {
      fontSize: 'medium',
    },
  },
}));

/**
 * Recently viewed ProductSlider
 * @param {boolean} isCartPage Indicates if current page is cart
 * @param {boolean} isProductPage Indicates if current page is PDP
 * @param {boolean} showMore Indicates is showMore link should be displayed when applicable
 * @param {string[]} productIds Array of product ids
 * @param {string} headline Headline for Product slider
 * @param {string} className className
 * @return {JSX.Element}
 */
const ProductSlider = ({
  isCartPage,
  isProductPage,
  showMore,
  productIds,
  headline,
  className,
}) => {
  const { classes, cx } = useStyles();
  const showMoreUrl = useSelector(getPageUrl);

  if (isCartPage && !showOnEmptyCartPage) {
    return null;
  }

  if (isProductPage && !showOnPdpPage) {
    return null;
  }

  if (!productIds.length) {
    return null;
  }

  const hasShowMore = showMore && showMoreUrl;

  return (
    <div className={cx(classes.slider, className)}>
      <div className={classes.headlineContainer}>
        {headline && (
          <h3
            className={cx(
              classes.headline,
              (hasShowMore || isIOSTheme()) ? classes.headlineLeft : classes.headlineCentered,
              'recently-viewed-products__product-slider__headline'
            )}
          >
            <I18n.Text string={headline} />
          </h3>
        )}
        {hasShowMore && (
          <div className={classes.showMoreContainer}>
            <Button href={showMoreUrl} variant="link" color="primary">
              <I18n.Text string="recently_viewed_products.show_more" />
            </Button>
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
  className: PropTypes.string,
  headline: PropTypes.string,
  isCartPage: PropTypes.bool,
  isProductPage: PropTypes.bool,
  productIds: PropTypes.arrayOf(PropTypes.string),
  showMore: PropTypes.bool,
};

ProductSlider.defaultProps = {
  headline: null,
  isCartPage: false,
  isProductPage: false,
  productIds: [],
  showMore: false,
  className: '',
};

export default ProductSlider;
