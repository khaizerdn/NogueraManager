// File: src/config/globalStyles.js

export const COLORS = {
  bgLayer0: '#121212',
  bgLayer1: '#1E1E1E',
  bgLayer2: '#2A2A2A',
  bgLayer3: '#363636',
  textColor0: '#FFFFFF',
  textMuted: '#808080',
  accent: '#FFFFFF',
  navActive: '#FFFFFF',
  navInactive: '#808080',
};

export const FONT_SIZES = {
  small: 14,
  medium: 16,
  large: 18,
  title: 20,
  heading: 24,
};

export const SIZES = {
  padding: 15,
  margin: 15,
  borderRadius: 10,
};

export const FONTS = {
  regular: 'System',
  bold: 'System',
  fontSize: FONT_SIZES.medium,
};

export const container = {
  flex: 1,
  backgroundColor: COLORS.bgLayer0,
  padding: SIZES.padding,
};

export const title = {
  fontSize: FONT_SIZES.title,
  color: COLORS.textColor0,
  fontWeight: 'bold',
};

export const subtitle = {
  fontSize: FONT_SIZES.medium,
  color: COLORS.textMuted,
};
