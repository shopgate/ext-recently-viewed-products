import React from 'react';
import I18n from '@shopgate/pwa-common/components/I18n';
import { themeConfig } from '@shopgate/engage';
import PropTypes from 'prop-types';
import Icon from './components/Icon';
import styles from './style';

const { svgImages = {} } = themeConfig || {};

/**
 * The Cart Empty component.
 * If configured, theme config will override the icon here
 * @param {React.node} children children to display if image is configured in theme config
 * @return {JSX.Element}
 */
const Empty = ({ children }) => {
  const { emptyCart = '' } = svgImages || {};

  return (
    <div className={styles.container}>
      <div className={emptyCart ? styles.image : styles.icon} aria-hidden>
        {emptyCart ? children : <Icon />}
      </div>
      {!emptyCart && (
      <div className={styles.title}>
        <I18n.Text string="cart.empty" />
      </div>
      )}
    </div>
  );
};

Empty.propTypes = {
  children: PropTypes.node,
};

Empty.defaultProps = {
  children: null,
};

export default Empty;
