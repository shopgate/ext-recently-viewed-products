import React, { Component as mockedComponent } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getEmptyStore, getStoreWithProducts } from '../../mock';
import ProductSlider from './index';
import { getRecentlyViewedProducts } from '../../selectors';

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

describe('ProductSlider', () => {
  it('should render nothing', () => {
    const component = mount((
      <Provider store={getEmptyStore()}>
        <ProductSlider products={[]} />
      </Provider>
    ));

    expect(component).toMatchSnapshot();
    expect(component.html()).toBe(null);
  });

  it('should render slider', () => {
    const store = getStoreWithProducts();
    const products = getRecentlyViewedProducts(store.getState());
    const component = mount((
      <Provider store={getStoreWithProducts()}>
        <ProductSlider products={products} showMore={false} isCartPage />
      </Provider>
    ));

    expect(component).toMatchSnapshot();
    expect(component.find('Item').length).toBe(2);
    expect(component.find('ButtonLink').length).toBe(0);
  });

  it('should render slider with a show more button', () => {
    const store = getStoreWithProducts();
    const products = getRecentlyViewedProducts(store.getState());
    const component = mount((
      <Provider store={getStoreWithProducts()}>
        <ProductSlider products={products} showMore isCartPage />
      </Provider>
    ));

    expect(component).toMatchSnapshot();
    expect(component.find('Item').length).toBe(2);
    expect(component.find('ButtonLink').length).toBe(1);
  });
});
