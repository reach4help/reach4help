const BRAND_COLORS = {
  background: '#FFFFFF',
  backgroundDark: '#f6e6f5',
  primary: '#a12596',
  primaryLight1: '#fac8f5',
  primaryLight: '#d957cd',
  primaryDark: '#811e78',
  primaryDark1: '#1F0029',
  secondary: '#ffa32a',
  secondaryLight: '#ffcb52',
  secondaryDark: '#ff7b02',
};

export const COLORS = {
  brand: BRAND_COLORS,
  grayDark: '#333',
  gray: '#666',
  grayLight: '#888',
  grayLight1: '#cf7dc9',
  grayLight2: '#da9ad6',
  grayLight3: '#edceeb',
  grayLight4: '#f6e6f5',
  grayLight5: '#fbf4fa',
  borderBase: '#D9D9D9',
  red: '#ea4335',
  orange: BRAND_COLORS.secondary,
  blue: '#1890FF',
  blueDark: '#2b63c1',
  purple: BRAND_COLORS.primary,
  purpleDark: BRAND_COLORS.primaryDark,
  purpleLight: BRAND_COLORS.primaryLight,
  green: '#0F9D58',
  yellow: '#F4B400',
};

export const THEME = {
  spacingPx: 15,
  secondaryHeaderSizePx: 40,
  bg: COLORS.grayLight4,
  borderLight: `1px solid ${COLORS.grayLight3}`,
  textColor: COLORS.brand.primaryDark,
  textColorLight: COLORS.brand.primaryLight,
  secondaryTextColor: COLORS.brand.secondaryDark,
  secondaryTextColorLight: COLORS.brand.secondary,
  textLinkColor: COLORS.purpleLight,
  textLinkHoverColor: COLORS.purple,
  colors: COLORS,
  transitionSpeedQuick: '130ms',
  transitionSpeedNormal: '200ms',
  overlayPanelWidthPx: 320,
};

export type Theme = typeof THEME;
