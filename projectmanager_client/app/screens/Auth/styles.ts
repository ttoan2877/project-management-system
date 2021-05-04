import { StyleSheet } from 'react-native'
import AppStyles from 'config/styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 64,
    alignItems: 'center',
    backgroundColor: AppStyles.color.WHITE,
  },
  header: {
    marginTop: 64,
  },
  btn: {
    alignSelf: 'center',
  },
  text: {
    color: AppStyles.color.PRIMARY,
    textAlign: 'center',
  },
  maxWidth: {
    width: '100%',
  },
  submit: {
    marginTop: 16,
  },
})
