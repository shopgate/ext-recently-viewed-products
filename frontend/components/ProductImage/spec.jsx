import React from 'react';
import { mount } from 'enzyme';
import ProductImage from './index';

describe('ProductImage', () => {
  it('should render an image', () => {
    const component = mount(<ProductImage alt="Foo" src="http://localhost" />);
    expect(component.find('Image').exists()).toBe(true);
    expect(component.find('Placeholder').exists()).toBe(false);
    expect(component).toMatchSnapshot();
  });
  it('should render a placeholder and then an image', () => {
    const component = mount(<ProductImage alt="Foo" src={null} />);
    expect(component.find('Image').exists()).toBe(false);
    expect(component.find('Placeholder').exists()).toBe(true);
    expect(component).toMatchSnapshot();
    component.setProps({ src: 'http://localhost' });
    component.update();
    expect(component.find('Image').exists()).toBe(true);
    expect(component.find('Placeholder').exists()).toBe(false);
    expect(component).toMatchSnapshot();
  });
  it('should render an image and then placeholder on error', () => {
    const component = mount(<ProductImage alt="Foo" src="http://localhost" />);
    expect(component.find('Image').exists()).toBe(true);
    expect(component.find('Placeholder').exists()).toBe(false);
    expect(component).toMatchSnapshot();
    component.at(0).instance().imageLoadingFailed();
    component.update();
    expect(component.find('Image').exists()).toBe(false);
    expect(component.find('Placeholder').exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
