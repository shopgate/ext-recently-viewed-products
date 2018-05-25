import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import { RECENTLY_VIEWED_PATH } from '../../constants';
import isIOSTheme from '../../helpers/isiOSTheme';

/**
 * NavDrawer (and MoreMenu) Item.
 * @param {Object} props Props.
 * @returns {JSX}
 */
const NavDrawerItem = (props) => {
  if (isIOSTheme()) {
    return null;
  }
  const { Item, handleClose } = props;
  return (
    <Item
      close={handleClose}
      link={RECENTLY_VIEWED_PATH}
      title="recently_viewed_products.headline"
    >
      <I18n.Text string="recently_viewed_products.headline" />
    </Item>
  );
};

NavDrawerItem.propTypes = {
  handleClose: PropTypes.func.isRequired,
  Item: PropTypes.func.isRequired,
};

export default NavDrawerItem;
