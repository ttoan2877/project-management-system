import React from 'react'
import { StyleSheet } from 'react-native'

import Icon from 'components/Icon'
import AppStyles from 'config/styles'
import Touchable from 'components/Touchable'

export const ACTION_BUTTON_SIZE = 56

interface FloatingButtonProps {
  onPress: () => void
  icon: string
  buttonStyle?: any
  iconColor?: string
}

const FloatingButton = ({
  onPress,
  icon,
  iconColor = AppStyles.color.WHITE,
  buttonStyle,
}: FloatingButtonProps) => {
  return (
    <Touchable
      underlay={true}
      underlayColor={AppStyles.color.SECONDARY}
      onPress={onPress}
      style={[AppStyles.common.shadow, styles.btn, buttonStyle]}>
      <Icon name={icon} color={iconColor} />
    </Touchable>
  )
}

export default FloatingButton

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    borderRadius: ACTION_BUTTON_SIZE,
    width: ACTION_BUTTON_SIZE,
    aspectRatio: 1,
    bottom: 16,
    right: 16,
    backgroundColor: AppStyles.color.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
