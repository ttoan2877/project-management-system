import React, { memo } from 'react'
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native'

import AppStyles from 'config/styles'

const styles = StyleSheet.create({
  h1: {
    fontSize: AppStyles.size.h1,
    color: AppStyles.color.DARK,
    lineHeight: 40,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: AppStyles.size.h2,
    color: AppStyles.color.DARK,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  h3: {
    fontSize: AppStyles.size.h3,
    color: AppStyles.color.DARK,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  h4: {
    fontSize: AppStyles.size.h4,
    color: AppStyles.color.DARK,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  h5: {
    fontSize: AppStyles.size.h5,
    color: AppStyles.color.DARK,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  small: {
    fontSize: AppStyles.size.small,
    color: AppStyles.color.DARK,
    lineHeight: 20,
  },
  caption: {
    fontSize: AppStyles.size.caption,
    color: AppStyles.color.DARK,
    lineHeight: 20,
  },
  label: {
    fontSize: AppStyles.size.label,
    color: AppStyles.color.DARK,
  },
  error: {
    fontSize: AppStyles.size.caption,
    color: AppStyles.color.DANGER,
  },
  light: {
    color: AppStyles.color.WHITE,
  },
  gray: {
    color: AppStyles.color.GRAY,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  bold: {
    fontWeight: 'bold',
  },
})

export type TextType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'small'
  | 'caption'
  | 'label'
  | 'error'

export interface TextProps extends Partial<RNTextProps> {
  type?: TextType
  style?: any
  light?: boolean
  gray?: boolean
  bold?: boolean
  uppercase?: boolean
  children?: any
  onTextLayout?: any
}

const Text = ({
  type = 'small',
  style = {},
  light,
  bold,
  gray,
  uppercase,
  children,
  ...rest
}: TextProps) => {
  return (
    <RNText
      allowFontScaling={false}
      style={[
        styles[type],
        light && styles.light,
        gray && styles.gray,
        bold && styles.bold,
        uppercase && styles.uppercase,
        style,
      ]}
      {...rest}>
      {children}
    </RNText>
  )
}
export default memo<TextProps>(Text)
