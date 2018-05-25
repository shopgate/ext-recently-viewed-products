import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductList from '../../../components/ProductList';

/* eslint-disable react/prefer-stateless-function */

/**
 * The recently viewed product view.
 */
class RecentlyViewedView extends Component {
  static propTypes = {
    View: PropTypes.func.isRequired,
  };

  static contextTypes = {
    i18n: PropTypes.func,
  };

  /**
   * @return {JSX}
   */
  render() {
    const { View } = this.props;
    const { __ } = this.context.i18n();

    return (
      <View title={__('recently_viewed_products.headline')}>
        <ProductList />
      </View>
    );
  }
}

/* eslint-enable react/prefer-stateless-function */

export default RecentlyViewedView;
