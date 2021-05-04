import Form from 'components/Form'
import React, { useCallback, useState } from 'react'
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native'
import Text from 'components/Text'
import AppStyles from 'config/styles'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { login } from 'store/auth/actions'
import styles from './styles'

const FIELDS = [
  {
    prop: 'mail',
    label: 'Email',
  },
  {
    prop: 'password',
    label: 'Password',
  },
]

const Auth = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState<any>({})
  const onSubmit = useCallback(() => {
    dispatch(login(data))
  }, [data, dispatch])
  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={[styles.text, styles.header]} type="h3">
          {'ONETECH ASIA\n PROJECT MANAGEMENT SYSTEM'}
        </Text>
        <View style={styles.maxWidth}>
          <Form data={data} onChangeData={setData} fields={FIELDS} />
          <Button mode="contained" onPress={onSubmit} style={styles.submit}>
            Login
          </Button>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text} type="h5">
            Forgot password?
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  )
}

export default Auth
