import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors } = themeConfig;
const grey = colors.shade5;

const leaveBase = {
  fill: grey,
  transformOrigin: 'center',
};

const basketBase = {
  fill: grey,
};

const leave1 = css({
  ...leaveBase,
}).toString();

const leave2 = css({
  ...leaveBase,
  fill: colors.shade11,
}).toString();

const leave3 = css({
  ...leaveBase,
  fill: colors.shade6,
}).toString();

const leave4 = css({
  ...leaveBase,
  fill: colors.shade12,
}).toString();

const leave5 = css({
  ...leaveBase,
}).toString();

const leave6 = css({
  ...leaveBase,
  fill: colors.shade12,
}).toString();

const basket = css({
  ...basketBase,
}).toString();

const handle = css({
  ...basketBase,
}).toString();

const basketAnimation = css({
  transformOrigin: 'center center',
}).toString();

export default {
  leave1,
  leave2,
  leave3,
  leave4,
  leave5,
  leave6,
  basket,
  handle,
  basketAnimation,
};
