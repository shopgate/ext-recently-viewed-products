import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors, variables } = themeConfig;

const sliderContainer = css({
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
  paddingBottom: variables.gap.small,
}).toString();

const slider = css({
  width: '100%',
  flex: 1,
  padding: variables.gap.small,
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

const headline = css({
  fontSize: 18,
  margin: `0 0 ${variables.gap.big}px`,
  textAlign: 'center',
}).toString();

const headlineCart = css({
  fontSize: 'medium',
  margin: `${variables.gap.small}px`,
  textAlign: 'left',
}).toString();

const showMoreContainer = css({
  display: 'flex',
  justifyContent: 'flex-start',
  textAlign: 'left',
  marginBottom: -variables.gap.bigger,
});

export default {
  card,
  headline,
  headlineCart,
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
