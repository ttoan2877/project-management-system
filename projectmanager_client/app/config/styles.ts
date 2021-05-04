import { StyleSheet } from 'react-native'

const AppStyles = {
  color: {
    TRANSPARENT: 'transparent',
    WHITE: '#fff',

    GREEN: '#01CB91',

    PRIMARY: '#600EE6',

    SECONDARY: '#414757',

    DARK: '#29313C',

    GRAY: '#7e95b2',

    LIGHT_GRAY: '#d8d8d8',

    BACKGROUND: '#F4F5FA',

    DANGER: '#ff3519',

    WARNING: '#FDCC6D',

    ORANGE: '#fb8f69',
  },

  size: {
    h1: 32,
    h2: 24,
    h3: 18,
    h4: 16,
    h5: 14,
    small: 14,
    caption: 12,
    label: 10,
  },
  common: StyleSheet.create({
    shadow: {
      shadowColor: '#414757',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
      zIndex: 1,
    },
  }),
}
export default AppStyles
