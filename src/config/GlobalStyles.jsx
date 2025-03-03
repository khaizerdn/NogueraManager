import { StyleSheet } from 'react-native';

const COLORS = {
  bgLayer0: '#121212',
  bgLayer1: '#1E1E1E',
  bgLayer2: '#2A2A2A',
  bgLayer3: '#363636',

  textColor0: '#E0E0E0',
  textMuted: '#3D3D3D',

  accent: '#E0E0E0',

  btnActive: '#E0E0E0',
  btnInActive: '#3D3D3D',
  btnPressed: '#B7B7B7',
  btnPressedMuted: '#282828',
};

const SPACING = {
  small: 10,
  medium: 15,
  large: 20,
};

const FONT_SIZES = {
  small: 14,
  medium: 16,
  large: 18,
  title: 20,
  heading: 24,
};

const SIZES = {
  padding: SPACING.large,
  margin: SPACING.medium,
  borderRadius: SPACING.small,
};

const FONTS = {
  regular: 'System',
  bold: 'System',
  fontSize: FONT_SIZES.medium,
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgLayer0,
    padding: SIZES.padding,
  },

  title: {
    fontSize: FONT_SIZES.title,
    color: COLORS.textColor0,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textMuted,
  },

  // Input field style:
  input: {
    width: '100%',
    height: 55,
    backgroundColor: COLORS.bgLayer1,
    borderRadius: SPACING.small,
    paddingHorizontal: SPACING.medium,
    marginBottom: SPACING.medium,
    fontSize: FONT_SIZES.medium,
    color: COLORS.textColor0,
  },

  // Modal styles:
  modal: {
    contentWrapper: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'space-between',
      width: '100%',
    },
    title: {
      fontSize: FONT_SIZES.title,
      fontWeight: 'bold',
      color: COLORS.textColor0,
      marginBottom: SPACING.large,
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
      width: '100%',
    },
    actionButtonMuted: {
      flex: 0.48,
      height: 45,
      backgroundColor: COLORS.btnInActive,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: SPACING.small,
    },
    actionButtonPressedMuted: {
      backgroundColor: COLORS.btnPressedMuted,
    },
    actionButton: {
      flex: 0.48,
      height: 45,
      backgroundColor: COLORS.accent,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: SPACING.small,
    },
    actionButtonPressed: {
      backgroundColor: COLORS.btnPressed,
    },
    actionButtonText: {
      fontSize: FONT_SIZES.large,
      fontWeight: 'bold',
      color: COLORS.bgLayer0,
    },
  },

  // Navigation button container for icons:
  navButton: {
    flex: 1,             // Each button takes equal space, filling the width
    height: '100%',      // Full height of the tab bar (80px)
    marginHorizontal: 0, // No gaps between buttons
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15, // Adjust this to control visual spacing between icons
    paddingVertical: 10,   // Ensures a larger touch area vertically
  },
});

export default globalStyles;
export { COLORS, FONT_SIZES, SIZES, FONTS, SPACING };
