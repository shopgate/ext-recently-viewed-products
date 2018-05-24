import React from 'react';
import Route from '@shopgate/pwa-common/components/Router/components/Route';
import { RECENTLY_VIEWED_PATH } from '../../constants';
import View from './View';

/**
 * The recently viewed route.
 * @param {Object} props The component props.
 * @return {JSX}
 */
const RecentlyViewedRoute = props => (
  <Route
    path={RECENTLY_VIEWED_PATH}
    component={View}
    {...props}
  />
);

export default RecentlyViewedRoute;
