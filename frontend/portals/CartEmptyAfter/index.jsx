import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import ProductsSlider from '../../components/ProductSlider';
import { getRecentlyViewedProductIdsWithLimit, hasMore } from '../../selectors';
import { cartHeadline } from '../../config';

const paddingiOS = css({
  paddingBottom: 'calc(var(--tabbar-height))',
}).toString();

/**
 * Portal position for Products Slider on PDP.
 * @params {string[]} productIds Product id collection.
 * @params {bool} showMore Whether to show more button (productIds.length > totalCount)
 * @returns {JSX}
 */
const CartEmptyAfter = ({ productIds, showMore }) => (
  <ProductsSlider
    className={paddingiOS}
    isCartPage
    showMore={showMore}
    productIds={productIds}
    headline={cartHeadline}
  />
);

CartEmptyAfter.propTypes = {
  productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  showMore: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps)(CartEmptyAfter);

