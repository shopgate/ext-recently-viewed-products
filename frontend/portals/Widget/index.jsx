import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ProductsSlider from '../../components/ProductSlider';
import { getRecentlyViewedProductIdsWithLimit, hasMore } from '../../selectors';

/**
 * Portal position for Products Slider widget.
 * @param {Object} settings Widget settings.
 * @param {string} settings.headline headline text.
 * @returns {JSX.Element}
 */
const Widget = ({ settings }) => {
  const productIds = useSelector(getRecentlyViewedProductIdsWithLimit);
  const showMore = useSelector(hasMore);

  return (
    <ProductsSlider
      showMore={showMore}
      productIds={productIds}
      headline={settings.headline}
    />
  );
};

Widget.propTypes = {
  settings: PropTypes.shape({
    headline: PropTypes.string,
  }),
};

Widget.defaultProps = {
  settings: {},
};

export default Widget;
