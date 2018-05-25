import React from 'react';
import { mount } from 'enzyme';
import Item from './index';

// eslint-disable-next-line require-jsdoc, react/prop-types
const MockedItem = props => (<div>{ props.children }</div>);

let mockedIsiOSTheme = false;
jest.mock('../../helpers/isiOSTheme', () => () => mockedIsiOSTheme);

describe('NavDrawer', () => {
  it('should render the Menu item', () => {
    const component = mount(<Item Item={MockedItem} handleClose={() => {}} />);
    expect(component).toMatchSnapshot();
    expect(component.html()).not.toBeNull();
  });

  it('should render nothing for ios', () => {
    mockedIsiOSTheme = true;
    const component = mount(<Item Item={MockedItem} handleClose={() => {}} />);
    expect(component.html()).toBeNull();
  });
});
