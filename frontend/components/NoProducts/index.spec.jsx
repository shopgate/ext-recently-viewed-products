import React from 'react';
import { mount } from 'enzyme';
import NoProducts from './index';

describe('ProductList', () => {
  it('should render as expected', () => {
    const component = mount(<NoProducts />);

    expect(component).toMatchSnapshot();
  });
});
