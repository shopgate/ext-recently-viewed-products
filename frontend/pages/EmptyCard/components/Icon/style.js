import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors } = themeConfig;
const grey = colors.shade5;
const defaultDuration = 2000;
const leaveKeyframes = css.keyframes({
  '0%': {
    transform: 'translate3d(0, -15%, 0) rotate(-7deg)',
  },
  '100%': {
    transform: 'translate3d(0, 15%, 0) rotate(7deg)',
  },
}).toString();

const basketKeyframes = css.keyframes({
  '0%': {
    transform: 'translate3d(0, -5%, 0) rotate(-1deg)',
  },
  '100%': {
    transform: 'translate3d(0, 3%, 0) rotate(1deg)',
  },
}).toString();

const leaveBase = {
  fill: grey,
  transformOrigin: 'center',
  animation: `${leaveKeyframes} linear 0s alternate infinite`,
};

const basketBase = {
  fill: grey,
};

const leave1 = css({
  ...leaveBase,
  animationDuration: `${defaultDuration}ms`,
}).toString();

const leave2 = css({
  ...leaveBase,
  animationDuration: `${defaultDuration-50}ms`,
}).toString();

const leave3 = css({
  ...leaveBase,
  animationDuration: `${defaultDuration-100}ms`,
}).toString();

const leave4 = css({
  ...leaveBase,
  animationDuration: `${defaultDuration-150}ms`,
}).toString();

const leave5 = css({
  ...leaveBase,
  animationDuration: `${defaultDuration-250}ms`,
}).toString();

const leave6 = css({
  ...leaveBase,
  animationDuration: '950ms',
}).toString();

const basket = css({
  ...basketBase,
}).toString();

const handle = css({
  ...basketBase,
}).toString();

const basketAnimation = css({
  transformOrigin: 'center center',
  animation: `${basketKeyframes} ${defaultDuration / 2}ms linear 0s alternate infinite`,
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
