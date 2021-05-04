import React from 'react'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import AppStyles from 'config/styles'

interface TextInputProps {
  label: string
  value: string
  onChange: (_: string) => void
  style?: any
  secureTextEntry?: boolean
}

const styles = StyleSheet.create({
  input: {
    ...AppStyles.common.shadow,
    backgroundColor: AppStyles.color.WHITE,
  },
})

const TextInput = ({
  label,
  value,
  onChange,
  style,
  secureTextEntry,
  ...props
}: TextInputProps) => {
  return (
    <PaperTextInput
      label={label}
      value={value}
      onChangeText={onChange}
      mode="outlined"
      style={[styles.input, style]}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  )
}

export default TextInput
