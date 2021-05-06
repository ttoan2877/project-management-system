import AppStyles from 'config/styles'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Portal } from 'react-native-paper'

interface LoadingProps {
  isLoading: boolean
}

const Loading = ({ isLoading }: LoadingProps) => {
  return isLoading ? (
    <Portal>
      <View style={styles.loadingContainer}>
        <View style={styles.backDrop} />
        <ActivityIndicator
          style={styles.indicator}
          animating={true}
          color={AppStyles.color.PRIMARY}
          size="small"
        />
      </View>
    </Portal>
  ) : null
}

export default Loading

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
  },
  backDrop: {
    flex: 1,
    backgroundColor: AppStyles.color.PRIMARY,
    opacity: 0.1,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})
