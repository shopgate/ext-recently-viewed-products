import React from 'react';
import { mount } from 'enzyme';
import EmptyCard from './index';

describe('EmptyCard page', () => {
  it('should render empty cart icon and title', () => {
    const component = mount(<EmptyCard />);
    expect(component.find('Icon').exists()).toBe(true);
    expect(component.html().indexOf('cart.empty')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});
