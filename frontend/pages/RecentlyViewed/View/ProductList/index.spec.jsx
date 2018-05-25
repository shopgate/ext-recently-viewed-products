import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getEmptyStore, getStoreWithProducts } from '../../../../mock';
import ProductList from './index';

/* eslint-disable global-require */

jest.mock('@shopgate/pwa-common-commerce/market/helpers/showTaxDisclaimer', () => () => null);

jest.mock(
  '@shopgate/pwa-common/helpers/config',
  () => require('@shopgate/pwa-common/helpers/config/mock')
);
/* eslint-enable */

describe('ProductList', () => {
  it('should render the NoProducts components when no products are on the list', () => {
    const component = mount((
      <Provider store={getEmptyStore()}>
        <ProductList />
      </Provider>
    ));

    expect(component).toMatchSnapshot();
    expect(component.find('NoProducts')).toHaveLength(1);
  });

  it('should render a list of products', () => {
    const component = mount((
      <Provider store={getStoreWithProducts()}>
        <ProductList />
      </Provider>
    ));

    expect(component).toMatchSnapshot();
    expect(component.find('ListItem').length).toBe(2);
  });
});
