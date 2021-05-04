import React from 'react'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IconProps } from 'react-native-vector-icons/Icon'
import { StyleSheet } from 'react-native'
import AppStyles from 'config/styles'

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
  },
})

interface IIcon extends IconProps {
  icomoon?: boolean
}

const Icon = ({
  size = 24,
  color = AppStyles.color.DARK,
  icomoon,
  style,
  ...props
}: IIcon) => {
  return (
    <MIcon
      size={size}
      color={color}
      style={[styles.container, { width: size }, style]}
      {...props}
    />
  )
}

export default Icon
