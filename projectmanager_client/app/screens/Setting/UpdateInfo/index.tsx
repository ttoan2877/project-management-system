import React, { useCallback, Fragment, useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import SecondaryLayout from 'components/SecondaryLayout'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthData } from 'store/auth/selectors'
import Form from 'components/Form'
import Loading from 'components/Loading'
import { getInfoState } from 'store/info/selectors'
import { updateInfo } from 'store/info/actions'

const FIELDS = [
  {
    prop: 'fullname',
    label: 'Fullname',
  },
  {
    prop: 'password',
    label: 'New password',
    secure: true,
  },
]

const UpdateInfo = () => {
  const dispatch = useDispatch()

  const { fullname } = useSelector(getAuthData)
  const [data, setData] = useState<any>({})
  const { isLoading } = useSelector(getInfoState)

  const onSubmit = useCallback(() => {
    dispatch(
      updateInfo({
        fullname,
        password: data['password'] ? data['password'] : undefined,
      }),
    )
  }, [data, dispatch, fullname])

  useEffect(() => {
    if (fullname) {
      setData({ fullname })
    }
  }, [fullname])

  return (
    <SecondaryLayout
      title="Update your information"
      onPressFooterButton={onSubmit}
      footerButtonLabel="Update information">
      <Fragment>
        <Form fields={FIELDS} data={data} onChangeData={setData} />
        <Loading isLoading={isLoading} />
      </Fragment>
    </SecondaryLayout>
  )
}

export default UpdateInfo

const styles = StyleSheet.create({})
