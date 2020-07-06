import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '@shopgate/engage/core';

/**
 * Add context with current product. Image component and image badges using it
 * @param {string} productId .
 * @param {Object} props .
 * @returns {JSX}
 */
const ContextBasedProductCard = ({ productId, ...props }) => {
  const { contexts: { ProductContext }, OriginalProductCard } = useContext(ThemeContext);

  return (
    <ProductContext.Provider value={{ productId }}>
      <OriginalProductCard productId={productId} {...props} />
    </ProductContext.Provider>
  );
};

ContextBasedProductCard.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ContextBasedProductCard;
