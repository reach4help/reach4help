const COLORS = {
  grayDark: '#333',
  gray: '#666',
  grayLight: '#888',
  grayLight2: '#ddd',
  grayLight3: '#f6f6f6',
  red: '#ea4335',
};

export const THEME = {
  spacingPx: 15,
  bg: COLORS.grayLight3,
  borderLight: `1px solid ${COLORS.grayLight2}`,
  textColor: COLORS.grayDark,
  textColorLight: COLORS.gray,
  textColorExtraLight: COLORS.grayLight,
  colors: COLORS,
};

export type Theme = typeof THEME;
