import React from 'react';
import PropTypes from 'prop-types';
import Route from '@shopgate/pwa-common/components/Router/components/Route';
import { TRAMPOLINE_PATH } from '../constants';
import pageComponentFactory from './PageComponentFactory';
import TrampolinePage from '../pages/Trampoline';

/**
 * TrampolineRoute route.
 * @param {function} View View component proto.
 * @returns {JSX}
 */
const TrampolineRoute = ({ View }) => (
  <Route
    path={`${TRAMPOLINE_PATH}/*`}
    component={pageComponentFactory({
      View,
      ComponentProto: TrampolinePage,
    })}
  />
);

TrampolineRoute.propTypes = {
  View: PropTypes.func.isRequired,
};

export default TrampolineRoute;
