import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors } = themeConfig;

const list = css({
  display: 'flex',
  minWidth: '100%',
  flexWrap: 'wrap',
  paddingTop: 2,
  background: colors.background,
}).toString();

const listItem = css({
  ':nth-child(even)': {
    padding: '2px 0 2px 2px',
  },
  ':nth-child(odd)': {
    padding: '2px 2px 2px 0',
  },
  ':first-child': {
    padding: '0 2px 2px 0',
  },
  ':nth-child(2)': {
    padding: '0 0 2px 2px',
  },
  padding: 2,
  width: '50%',
}).toString();

export default {
  list,
  listItem,
};
