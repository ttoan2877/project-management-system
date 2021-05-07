import Touchable from 'components/Touchable'
import Text from 'components/Text'
import AppStyles from 'config/styles'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import NavigationService from 'navigation/NavigationService'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
  btn: {
    backgroundColor: AppStyles.color.WHITE,
    borderColor: AppStyles.color.GRAY,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 4,
    aspectRatio: 1,
    marginLeft: 8,
    borderRadius: 4,
  },
  primary: {
    backgroundColor: AppStyles.color.PRIMARY,
  },
  secondary: {
    backgroundColor: AppStyles.color.ORANGE,
  },
})

const HomeAction = () => {
  const goToTask = useCallback(() => {
    NavigationService.navigate('Task')
  }, [])

  const goToProjectDetail = useCallback(() => {
    NavigationService.navigate('Modal', { screen: 'UpdateProject' })
  }, [])
  return (
    <View style={styles.container}>
      <Touchable onPress={goToTask} style={styles.btn}>
        <Text type="h5">My task</Text>
        <View style={[styles.dot, styles.primary]} />
      </Touchable>
      <Touchable onPress={goToProjectDetail} style={styles.btn}>
        <Text type="h5">Projects</Text>
        <View style={[styles.dot, styles.secondary]} />
      </Touchable>
    </View>
  )
}

export default HomeAction
