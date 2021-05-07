import React, { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import Touchable from 'components/Touchable'
import Text from 'components/Text'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'store/auth/actions'
import { switchProject } from 'store/project/actions'
import LayoutPrimary from 'components/LayoutPrimary'
import NavigationService from 'navigation/NavigationService'
import { getProjectData } from 'store/project/selectors'
import { getAuthData } from 'store/auth/selectors'
import AppStyles from 'config/styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  btn: {
    ...AppStyles.common.shadow,
    borderColor: AppStyles.color.LIGHT_GRAY,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  red: {
    justifyContent: 'center',
    backgroundColor: AppStyles.color.GRAY,
  },
  green: {
    backgroundColor: AppStyles.color.GREEN,
  },
  orange: {
    backgroundColor: AppStyles.color.ORANGE,
  },
  yellow: {
    backgroundColor: AppStyles.color.SECONDARY,
  },
})

const Setting = () => {
  const dispatch = useDispatch()
  const { creator_id } = useSelector(getProjectData)
  const { ID } = useSelector(getAuthData)

  const isOwner = useMemo(() => creator_id === ID, [ID, creator_id])

  const onSwitchProject = useCallback(() => {
    dispatch(switchProject())
  }, [dispatch])

  const onLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])
  return (
    <LayoutPrimary title="Settings">
      <View style={styles.container}>
        <View style={styles.content}>
          <Touchable
            style={[styles.btn, styles.yellow]}
            onPress={onSwitchProject}>
            <Text light type="h5" uppercase>
              Switch project
            </Text>
          </Touchable>
          <Touchable
            style={[styles.btn, styles.green]}
            onPress={() =>
              NavigationService.navigate('Modal', { screen: 'UpdateUser' })
            }>
            <Text light type="h5" uppercase>
              Update your information
            </Text>
          </Touchable>
          {isOwner && (
            <Touchable
              style={[styles.btn, styles.orange]}
              onPress={() =>
                NavigationService.navigate('Modal', { screen: 'UpdateProject' })
              }>
              <Text light type="h5" uppercase>
                Update project information
              </Text>
            </Touchable>
          )}
        </View>
        <Touchable style={[styles.btn, styles.red]} onPress={onLogout}>
          <Text light type="h5" uppercase>
            Logout
          </Text>
        </Touchable>
      </View>
    </LayoutPrimary>
  )
}

export default Setting
