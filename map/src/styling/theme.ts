const COLORS = {
  grayDark: '#333',
  gray: '#666',
  grayLight: '#888',
  grayLight1: '#bbb',
  grayLight2: '#ddd',
  grayLight3: '#e3e3e3',
  grayLight4: '#f6f6f6',
  red: '#ea4335',
  blue: '#4285f4',
  blueDark: '#2b63c1',
};

export const THEME = {
  spacingPx: 15,
  bg: COLORS.grayLight4,
  borderLight: `1px solid ${COLORS.grayLight2}`,
  textColor: COLORS.grayDark,
  textColorLight: COLORS.gray,
  textColorExtraLight: COLORS.grayLight,
  textLinkColor: COLORS.blueDark,
  textLinkHoverColor: COLORS.blue,
  colors: COLORS,
};

export type Theme = typeof THEME;
