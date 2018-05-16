import React from 'react';
import PropTypes from 'prop-types';
import { bin2hex } from '@shopgate/pwa-common/helpers/data';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import { ITEM_PATH } from '@shopgate/pwa-common-commerce/product/constants/index';
import ProductImage from '../ProductImage';

/**
 * The ProductCard component.
 * @param {Object} props The component props.
 * @param {Object} props.product The product data.
 * @return {JSX}
 */
const ProductCard = ({
  product,
}) => (
  <Link
    tagName="a"
    href={`${ITEM_PATH}/${bin2hex(product.id)}`}
    itemProp="item"
    itemScope
    itemType="http://schema.org/Product"
  >
    <ProductImage itemProp="image" src={product.featuredImageUrl} alt={product.name} />
  </Link>
);

ProductCard.propTypes = {
  product: PropTypes.shape().isRequired,
};

export default ProductCard;
