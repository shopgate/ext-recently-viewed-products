import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { isIOSTheme } from '@shopgate/pwa-extension-kit/env/helpers';

const { colors, variables } = themeConfig;

const sliderContainer = css({
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
  paddingBottom: variables.gap.big,
}).toString();

const slider = css({
  width: '100%',
  flex: 1,
  padding: `${variables.gap.small}px 0`,
}).toString();

const sliderItem = css({
  width: '50%',
}).toString();

const productInfo = css({
  padding: 15,
}).toString();

const productName = css({
  fontWeight: 500,
}).toString();

const priceGrid = css({
  alignItems: 'flex-end',
}).toString();

const priceStrikedItem = css({
  flexGrow: 1,
}).toString();

const priceItem = css({
  flexGrow: 1,
  textAlign: 'right',
}).toString();

const priceBase = css({
  padding: '0 15px',
}).toString();

const priceStriked = css({
  ...priceBase,
  fontSize: '0.875rem',
}).toString();

const price = css({
  ...priceBase,
  color: colors.primary,
  fontSize: '1rem',
}).toString();

const card = css({
  background: '#FFF',
  height: '100%',
  margin: '0px 8px',
}).toString();

const headlineContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  overflow: 'hidden',
});

/**
 * Headline css
 * @param {boolean} hasShowMore Whether there is more button visible.
 * @returns {string}
 */
const headline = hasShowMore => css({
  fontSize: isIOSTheme() ? 22 : 18,
  width: '100%',
  // The Button which is right aligned to the headline has a paddingTop modification by 1px
  margin: isIOSTheme() ? '8px 16px' : '8px 8px 8px 12px',
  padding: 0,
  textAlign: hasShowMore || isIOSTheme() ? 'left' : 'center',
}).toString();

const showMoreContainer = css({
  ' button': {
    fontSize: 'medium',
  },
});

export default {
  card,
  headlineContainer,
  headline,
  sliderContainer,
  slider,
  sliderItem,
  productInfo,
  productName,
  priceGrid,
  priceStrikedItem,
  priceItem,
  priceBase,
  priceStriked,
  price,
  showMoreContainer,
};
