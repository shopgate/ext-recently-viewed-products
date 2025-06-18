import React, { useMemo } from 'react';
import I18n from '@shopgate/pwa-common/components/I18n';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { encodeSVG } from '@shopgate/engage/core';
import styles from './style';

const { fullSVGs } = themeConfig;

/**
 * No products component
 * @returns {JSX.Element}
 */
const NoProducts = () => {
  const { noResultsImage } = fullSVGs;

  const imageSRC = useMemo(() => encodeSVG(noResultsImage),
    [noResultsImage]);

  return (
    <div className={styles.wrapper}>
      {noResultsImage && <img src={imageSRC} alt="" />}
      <I18n.Text string="recently_viewed_products.empty_product_list" />
    </div>
  );
};

export default NoProducts;
