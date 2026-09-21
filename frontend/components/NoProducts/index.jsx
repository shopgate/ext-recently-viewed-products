import React from 'react';
import { I18n } from '@shopgate/engage/components';
import { makeStyles } from '@shopgate/engage/styles';

const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    height: '90vw',
    maxHeight: '40vh',
    minHeight: '90vw',
    textAlign: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: '0 16px 16px',
  },
}));

/**
 * No products component
 * @returns {JSX.Element}
 */
const NoProducts = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <I18n.Text string="recently_viewed_products.empty_product_list" />
    </div>
  );
};

export default NoProducts;
