import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors, variables } = themeConfig;

const container = css({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  flexGrow: '1',
  flexShrink: '0',
  padding: '1em 0',
}).toString();

const icon = css({
  width: 130,
  padding: '1em 0 0',
}).toString();

const image = css({
  width: variables.emptyPage.icon,
}).toString();

const title = css({
  textAlign: 'left',
  color: colors.shade6,
}).toString();

export default {
  container,
  icon,
  title,
  image,
};
