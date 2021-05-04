import AppStyles from 'config/styles'
import React, { useCallback, Fragment, memo, useMemo } from 'react'
import { TouchableOpacity, TouchableHighlight, Animated } from 'react-native'

export interface TouchableProps {
  disabled?: boolean
  onPress?: () => void
  children?: any
  style?: any
  underlay?: boolean
  underlayColor?: string
  scale?: number
  onLayout?: () => void
}

const Touchable = ({
  disabled,
  onPress,
  children,
  style,
  underlay,
  underlayColor,
  scale = 0.95,
  ...rest
}: TouchableProps) => {
  const scaleInAnimated = useMemo(() => new Animated.Value(0), [])

  const SCALE = useMemo(
    () => ({
      // this defines the terms of our scaling animation.
      getScaleTransformationStyle(
        animated: Animated.Value,
        startSize: number = 1,
        endSize: number = scale,
      ) {
        const interpolation = animated.interpolate({
          inputRange: [0, 1],
          outputRange: [startSize, endSize],
        })
        return {
          transform: [{ scale: interpolation }],
        }
      },
      // This defines animation behavior we expect onPressIn
      pressInAnimation(animated: Animated.Value, duration: number = 100) {
        animated.setValue(0)
        Animated.timing(animated, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }).start()
      },
      // This defines animation behavior we expect onPressOut
      pressOutAnimation(animated: Animated.Value, duration: number = 100) {
        animated.setValue(1)
        Animated.timing(animated, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }).start()
      },
    }),
    [scale],
  )

  const handleOnPress = useCallback(() => {
    requestAnimationFrame(() => {
      onPress && onPress()
    })
  }, [onPress])

  const Component: any = useMemo(
    () =>
      underlay
        ? Animated.createAnimatedComponent(TouchableHighlight)
        : TouchableOpacity,
    [underlay],
  )

  return (
    <Component
      hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
      underlayColor={underlayColor || AppStyles.color.WHITE}
      activeOpacity={0.75}
      disabled={disabled}
      onPress={handleOnPress}
      onPressIn={() => {
        SCALE.pressInAnimation(scaleInAnimated)
      }}
      onPressOut={() => {
        SCALE.pressOutAnimation(scaleInAnimated)
      }}
      style={[style, SCALE.getScaleTransformationStyle(scaleInAnimated)]}
      {...rest}>
      <Fragment>{children}</Fragment>
    </Component>
  )
}

export default memo(Touchable)
