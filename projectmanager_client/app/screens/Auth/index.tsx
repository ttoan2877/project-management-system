import Form, { Field } from 'components/Form'
import React, { useCallback, useState, Fragment } from 'react'
import Text from 'components/Text'
import AppStyles from 'config/styles'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'store/auth/actions'
import LayoutPrimary from 'components/LayoutPrimary'
import Touchable from 'components/Touchable'
import { StyleSheet } from 'react-native'
import Loading from 'components/Loading'
import { getAuthState } from 'store/auth/selectors'

const styles = StyleSheet.create({
  text: {
    color: AppStyles.color.PRIMARY,
    textAlign: 'center',
    marginBottom: 16,
  },
  submit: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: AppStyles.color.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
})

const FIELDS: Field[] = [
  {
    prop: 'mail',
    label: 'Email',
  },
  {
    prop: 'password',
    label: 'Password',
    secure: true,
  },
]

const Auth = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(getAuthState)

  const [data, setData] = useState<any>({})

  const onSubmit = useCallback(() => {
    dispatch(login(data))
  }, [data, dispatch])

  const renderHeader = useCallback(
    () => (
      <Text style={styles.text} type="h3">
        {'ONETECH ASIA\n PROJECT MANAGEMENT SYSTEM'}
      </Text>
    ),
    [],
  )
  return (
    <LayoutPrimary renderHeader={renderHeader}>
      <Fragment>
        <Form data={data} onChangeData={setData} fields={FIELDS} />
        <Touchable onPress={onSubmit} style={styles.submit}>
          <Text light type="h5" uppercase>
            Login
          </Text>
        </Touchable>
        <Loading isLoading={isLoading} />
      </Fragment>
    </LayoutPrimary>
  )
}

export default Auth
