import React, { useCallback, Fragment } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Touchable from 'components/Touchable'
import Text from 'components/Text'
import { useDispatch } from 'react-redux'
import { logout } from 'store/auth/actions'
import { switchProject } from 'store/project/actions'
import LayoutPrimary from 'components/LayoutPrimary'

const Setting = () => {
  const dispatch = useDispatch()

  const onSwitchProject = useCallback(() => {
    dispatch(switchProject())
  }, [dispatch])

  const onLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])
  return (
    <LayoutPrimary>
      <Fragment>
        <Touchable onPress={onSwitchProject}>
          <Text>Switch project</Text>
        </Touchable>
        <Touchable onPress={onLogout}>
          <Text>Logout</Text>
        </Touchable>
      </Fragment>
    </LayoutPrimary>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {},
})
