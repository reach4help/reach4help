const BRAND_COLORS = {
  background: '#FFFFFF',
  backgroundDark: '#f6e6f5',
  primary: '#a12596',
  primaryLight: '#d957cd',
  primaryDark: '#811e78',
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
  red: '#ea4335',
  orange: BRAND_COLORS.secondary,
  blue: '#4285f4',
  blueDark: '#2b63c1',
  purple: BRAND_COLORS.primary,
  purpleDark: BRAND_COLORS.primaryDark,
  purpleLight: BRAND_COLORS.primaryLight,
  green: '#0F9D58',
  yellow: '#F4B400',
};

export const THEME = {
  spacingPx: 15,
  bg: COLORS.grayLight4,
  borderLight: `1px solid ${COLORS.grayLight3}`,
  textColor: COLORS.brand.primaryDark,
  textColorLight: COLORS.brand.primaryLight,
  secondaryTextColor: COLORS.brand.secondaryDark,
  secondaryTextColorLight: COLORS.brand.secondary,
  textLinkColor: COLORS.purpleLight,
  textLinkHoverColor: COLORS.purple,
  colors: COLORS,
};

export type Theme = typeof THEME;
