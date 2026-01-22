import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductsSlider from '../../components/ProductSlider';
import { getRecentlyViewedProductIdsWithLimit, hasMore } from '../../selectors';

/**
 * Portal position for Products Slider on PDP.
 * @params {string[]} productIds Product id collection.
 * @params {Object} settings Widget settings.
 * @params {string} settings.headline headline text.
 * @params {boolean} settings.autoPlay Whether to enable autoplay.
 * @params {boolean} showMore Whether to show more button (products.length > totalCount)
 * @returns {JSX.Element}
 */
const Widget = ({ productIds, showMore, settings }) => (
  <ProductsSlider
    showMore={showMore}
    productIds={productIds}
    headline={settings.headline}
    autoPlay={settings.autoPlay}
  />
);

Widget.propTypes = {
  productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  showMore: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    headline: PropTypes.string,
    autoPlay: PropTypes.bool,
  }),
};

Widget.defaultProps = {
  settings: {},
};

/**
 * Maps state to props.
 * @param {Object} state State.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  productIds: getRecentlyViewedProductIdsWithLimit(state),
  showMore: hasMore(state),
});

export default connect(mapStateToProps)(Widget);

