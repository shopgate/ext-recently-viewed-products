import React from 'react';
import I18n from '@shopgate/pwa-common/components/I18n';
import Icon from './components/Icon';
import styles from './style';

/**
 * The Cart Empty component.
 * @return {JSX.Element}
 */
const Empty = () => (
  <div className={styles.container}>
    <div className={styles.icon}>
      <Icon />
    </div>
    <div className={styles.title}>
      <I18n.Text string="cart.empty" />
    </div>
  </div>
);

export default Empty;
