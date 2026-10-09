import React from 'react';
import PropTypes from 'prop-types';
import ProductList from '../ProductList';
import config from '../../config.json';

const { pageId } = config;

/**
 * The RecentlyViewedPage will display the list of recently viewed products at
 * the end of a common cms page.
 * @param {Object} props The component props.
 * @return {JSX}
 */
const RecentlyViewedPage = ({ id }) => {
  if (id !== pageId) {
    return null;
  }

  return (
    <ProductList />
  );
};

RecentlyViewedPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RecentlyViewedPage;
