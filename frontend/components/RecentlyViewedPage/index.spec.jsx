import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getStoreWithProducts } from '../../mock';
import RecentlyViewedPage from './index';
import { pageId } from '../../config';

describe('RecentlyViewedPage', () => {
  it('should render nothing when no valid pageId is passed', () => {
    const component = mount((
      <Provider store={getStoreWithProducts()}>
        <RecentlyViewedPage id="mocked-page" />
      </Provider>
    ));

    expect(component).toMatchSnapshot();
    expect(component.html()).toBe(null);
  });

  it('hould render a product list when a valid pageId is passed', () => {
    const component = mount((
      <Provider store={getStoreWithProducts()}>
        <RecentlyViewedPage id={pageId} />
      </Provider>
    ));

    expect(component).toMatchSnapshot();
    expect(component.find('ProductList').length).toBe(1);
    expect(component.find('ListItem').length).toBe(2);
  });
});
