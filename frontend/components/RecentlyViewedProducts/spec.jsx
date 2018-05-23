import React, { Component as mockedComponent } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getEmptyStore, getStoreWithProducts } from '../../mock';
import RecentlyViewedProducts from './index';

/* eslint-disable require-jsdoc, global-require */
jest.mock('@shopgate/pwa-common/components/Slider', () => (class extends mockedComponent {
  static Item({ children }) { return (<div>{children}</div>); }
  render() {
    return (<div>{this.props.children}</div>);
  }
}));

jest.mock('@shopgate/pwa-common-commerce/market/helpers/showTaxDisclaimer', () => () => null);

jest.mock(
  '@shopgate/pwa-common/helpers/config',
  () => require('@shopgate/pwa-common/helpers/config/mock')
);
/* eslint-enable */

describe('RecentlyViewedProducts', () => {
  it('should render nothing', () => {
    const component = mount(
      <Provider store={getEmptyStore()}>
        <RecentlyViewedProducts />
      </Provider>
    );
    expect(component.html()).toBe(null);
  });
  it('should render slider', () => {
    const component = mount(
      <Provider store={getStoreWithProducts()}>
        <RecentlyViewedProducts />
      </Provider>
    );
    expect(component.find('Item').length).toBe(2);
    expect(component).toMatchSnapshot();
  });
});
