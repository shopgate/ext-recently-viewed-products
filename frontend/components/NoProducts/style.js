import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

const wrapper = css({
  display: 'flex',
  height: '90vw',
  maxHeight: '40vh',
  minHeight: '90vw',
  textAlign: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: `${variables.gap.big}px ${variables.gap.big}px`,
  padding: `0 ${variables.gap.big}px ${variables.gap.big}px`,
});

export default {
  wrapper,
};
