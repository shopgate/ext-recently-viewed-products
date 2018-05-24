import React from 'react';
import { mount } from 'enzyme';
import EmptyCart from './index';

describe('EmptyCart page', () => {
  it('should render empty cart icon and title', () => {
    const component = mount(<EmptyCart />);
    expect(component.find('Icon').exists()).toBe(true);
    expect(component.html().indexOf('cart.empty')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});
