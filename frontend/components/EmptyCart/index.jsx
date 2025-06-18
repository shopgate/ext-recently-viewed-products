import React, { useMemo } from 'react';
import I18n from '@shopgate/pwa-common/components/I18n';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { encodeSVG } from '@shopgate/engage/core/helpers';
import Icon from './components/Icon';
import styles from './style';

const { fullSVGs = {} } = themeConfig || {};

/**
 * The Cart Empty component.
 * If configured, theme config will override the icon here
 * @return {JSX.Element}
 */
const Empty = () => {
  const { emptyCart = '' } = fullSVGs || {};

  const imageSRC = useMemo(() => encodeSVG(emptyCart),
    [emptyCart]);

  return (
    <div className={styles.container}>
      <div className={imageSRC ? styles.image : styles.icon} aria-hidden>
        {imageSRC ? <img src={imageSRC} alt="" /> : <Icon />}
      </div>
      <div className={styles.title}>
        <I18n.Text string="cart.empty" />
      </div>
    </div>
  );
};

export default Empty;
