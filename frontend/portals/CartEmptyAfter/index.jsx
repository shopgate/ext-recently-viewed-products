import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@shopgate/engage/styles';
import ProductsSlider from '../../components/ProductSlider';
import { getRecentlyViewedProductIdsWithLimit, hasMore } from '../../selectors';
import config from '../../config.json';

const { cartHeadline } = config;

const useStyles = makeStyles()(() => ({
  paddingiOS: {
    paddingBottom: 'var(--tabbar-height, 0px)',
  },
}));

/**
 * Portal position for the Products Slider on the empty cart page.
 * @returns {JSX}
 */
const CartEmptyAfter = () => {
  const { classes } = useStyles();
  const productIds = useSelector(getRecentlyViewedProductIdsWithLimit);
  const showMore = useSelector(hasMore);

  return (
    <ProductsSlider
      className={classes.paddingiOS}
      isCartPage
      showMore={showMore}
      productIds={productIds}
      headline={cartHeadline}
    />
  );
};

export default CartEmptyAfter;
