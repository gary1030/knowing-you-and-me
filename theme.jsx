// theme.js
import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    primary: '#fcad39',
    onPrimary: 'rgb(0, 0, 0)', // black text on yellow background
    primaryContainer: '#ffe6a8', // lighter shade of primary
    onPrimaryContainer: 'rgb(0, 0, 0)', // black text on light yellow background
    secondary: '#ffd700', // another shade of yellow
    onSecondary: 'rgb(0, 0, 0)', // black text on yellow background
    secondaryContainer: '#ffecb3', // lighter shade of secondary
    onSecondaryContainer: 'rgb(0, 0, 0)', // black text on light yellow background
    tertiary: '#ffcc00', // another shade of yellow
    onTertiary: 'rgb(0, 0, 0)', // black text on yellow background
    tertiaryContainer: '#fff2cc', // lighter shade of tertiary
    onTertiaryContainer: 'rgb(0, 0, 0)', // black text on light yellow background
    error: 'rgb(186, 26, 26)', // keep error color
    onError: 'rgb(255, 255, 255)', // keep error text color
    errorContainer: 'rgb(255, 218, 214)', // keep error container color
    onErrorContainer: 'rgb(65, 0, 2)', // keep error container text color
    background: 'rgb(255, 251, 255)', // keep background color
    onBackground: 'rgb(29, 27, 30)', // keep background text color
    surface: 'rgb(255, 251, 255)', // keep surface color
    onSurface: 'rgb(29, 27, 30)', // keep surface text color
    surfaceVariant: 'rgb(233, 223, 235)', // keep surface variant color
    onSurfaceVariant: 'rgb(74, 69, 78)', // keep surface variant text color
    outline: 'rgb(124, 117, 126)', // keep outline color
    outlineVariant: 'rgb(204, 196, 206)', // keep outline variant color
    shadow: 'rgb(0, 0, 0)', // keep shadow color
    scrim: 'rgb(0, 0, 0)', // keep scrim color
    inverseSurface: 'rgb(50, 47, 51)', // keep inverse surface color
    inverseOnSurface: 'rgb(245, 239, 244)', // keep inverse surface text color
    inversePrimary: 'rgb(220, 184, 255)', // keep inverse primary color
    elevation: {
      level0: 'transparent',
      level1: '#fffef3', // lighter shade of primary
      level2: '#fffde9', // lighter shade of primary
      level3: '#fffddf', // lighter shade of primary
      level4: '#fffcD5', // lighter shade of primary
      level5: '#fffbcb', // lighter shade of primary
    },
    surfaceDisabled: 'rgba(29, 27, 30, 0.12)', // keep surface disabled color
    onSurfaceDisabled: 'rgba(29, 27, 30, 0.38)', // keep surface disabled text color
    backdrop: 'rgba(51, 47, 55, 0.4)', // keep backdrop color
  },
};

export default theme;
