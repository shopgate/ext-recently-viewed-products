import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '@shopgate/engage/core';
import ContextBasedProductCard from '../ContextBasedProductCard';

/**
 * @param {Object} children .
 * @returns {JSX}
 */
const ThemeProvideProductCard = ({ children }) => {
  const { ProductCard: OriginalProductCard, ...context } = useContext(ThemeContext);

  return (
    <ThemeContext.Provider value={{
      ...context,
      ProductCard: ContextBasedProductCard,
      OriginalProductCard,
    }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvideProductCard.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ThemeProvideProductCard;
