import React from 'react';
import PropTypes from 'prop-types';
import { I18n } from '@shopgate/engage/components';
import { themeConfig } from '@shopgate/engage';
import { makeStyles } from '@shopgate/engage/styles';
import Icon from './components/Icon';

const { svgImages = {} } = themeConfig || {};
const { emptyCart = '' } = svgImages || {};

const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: '1',
    flexShrink: '0',
    padding: '1em 0',
  },
  icon: {
    width: 130,
    padding: '1em 0 0',
  },
  title: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

/**
 * The Cart Empty component.
 * If configured, theme config will override the icon here
 * @param {React.node} children children to display if image is configured in theme config
 * @return {JSX.Element}
 */
const Empty = ({ children }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={emptyCart ? null : classes.icon} aria-hidden>
        {emptyCart ? children : <Icon />}
      </div>
      {!emptyCart && (
        <div className={classes.title}>
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
