import TextInput from 'components/TextInput'
import React, { useCallback } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'

export interface Field {
  prop: string
  label: string
  secure?: boolean
  multiline?: boolean
}

interface FormProps {
  fields: Field[]
  data: any
  onChangeData: (_: any) => void
  style?: any
}

const styles = StyleSheet.create({
  top8: {
    marginTop: 16,
  },
  container: {
    width: '100%',
    padding: 16,
  },
})

const Form = ({ fields, data, onChangeData, style }: FormProps) => {
  const onChangeValue = useCallback(
    (prop: string, value: string) => {
      onChangeData({ ...data, [prop]: value })
    },
    [data, onChangeData],
  )

  return (
    <KeyboardAvoidingView style={[styles.container, style]}>
      {fields.map((field: Field, index: number) => (
        <TextInput
          key={field.prop}
          label={field.label}
          value={data[field.prop]}
          secureTextEntry={field.secure}
          multiline={field.multiline}
          onChange={(value: string) => onChangeValue(field.prop, value)}
          style={[!!index && styles.top8]}
        />
      ))}
    </KeyboardAvoidingView>
  )
}

export default Form
