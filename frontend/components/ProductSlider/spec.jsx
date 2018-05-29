import React, { Component as mockedComponent } from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getEmptyStore, getStoreWithProducts } from '../../mock';
import { RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT } from '../../constants';
import ProductSlider from './index';

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
        <ProductSlider />
      </Provider>
    ));

    expect(component).toMatchSnapshot();
    expect(component.html()).toBe(null);
  });

  it('should render slider', () => {
    const component = mount((
      <Provider store={getStoreWithProducts()}>
        <ProductSlider />
      </Provider>
    ));

    expect(component).toMatchSnapshot();
    expect(component.find('Item').length).toBe(2);
    expect(component.find('ButtonLink').length).toBe(0);
  });

  it('should render slider with a show more button', () => {
    const component = mount((
      <Provider store={getStoreWithProducts(RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT + 1)}>
        <ProductSlider />
      </Provider>
    ));

    expect(component).toMatchSnapshot();
    expect(component.find('Item').length).toBe(RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT);
    expect(component.find('ButtonLink').length).toBe(1);
  });
});
