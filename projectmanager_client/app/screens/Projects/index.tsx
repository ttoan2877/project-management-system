import React, { useCallback, useEffect, Fragment } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthData } from 'store/auth/selectors'
import Text from 'components/Text'
import Touchable from 'components/Touchable'
import NavigationService from 'navigation/NavigationService'
import LayoutPrimary from 'components/LayoutPrimary'
import Card from 'components/Card'
import { get } from 'lodash'
import Separator from 'components/Separator'
import { fetchProject } from 'store/project/actions'
import { getProjectState } from 'store/project/selectors'
import Loading from 'components/Loading'
import { fetchUserProject } from 'store/userProject/actions'
import { getUserProjectState } from 'store/userProject/selectors'
import AppStyles from 'config/styles'
import { logout } from 'store/auth/actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  btn: {
    ...AppStyles.common.shadow,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    padding: 8,
    backgroundColor: AppStyles.color.PRIMARY,
    marginHorizontal: 8,
  },
  logout: {
    backgroundColor: AppStyles.color.SECONDARY,
  },
})

const ListEmptyComponent = () => (
  <View style={[styles.container, styles.center]}>
    <Text>Please create a project</Text>
  </View>
)

const Projects = () => {
  const dispatch = useDispatch()
  const { projects, ID } = useSelector(getAuthData)
  const { isLoading } = useSelector(getProjectState)
  // const { data } = useSelector(getUserProjectState)

  const onProject = useCallback(
    (ID: number) => {
      dispatch(fetchProject(ID))
    },
    [dispatch],
  )

  const onRefresh = useCallback(() => {
    dispatch(fetchUserProject())
  }, [dispatch])

  useEffect(() => {
    onRefresh()
  }, [onRefresh])

  const renderItem = useCallback(
    ({ item }) => {
      const isOwner = get(item, 'creator_id') === ID
      return (
        <Card
          name={get(item, 'name', '')}
          description={get(item, 'description', '')}
          created_at={get(item, 'CreatedAt', '')}
          users={get(item, 'users', [])}
          isOwner={isOwner}
          onPress={() => onProject(get(item, 'ID'))}
        />
      )
    },
    [ID, onProject],
  )

  const onLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  const renderFooter = useCallback(
    () => (
      <View style={styles.footer}>
        <Touchable
          onPress={onLogout}
          style={[styles.container, styles.btn, styles.logout]}>
          <Text light uppercase type="h5">
            Logout
          </Text>
        </Touchable>
        <Touchable
          onPress={() => NavigationService.navigate('CreateProject')}
          style={[styles.container, styles.btn]}>
          <Text light uppercase type="h5">
            New project
          </Text>
        </Touchable>
      </View>
    ),
    [onLogout],
  )

  return (
    <LayoutPrimary title="Choose your project" renderFooter={renderFooter}>
      <Fragment>
        <FlatList
          showsVerticalScrollIndicator={false}
          // onRefresh={onRefresh}
          // refreshing={isLoading}
          style={styles.container}
          contentContainerStyle={[
            !projects?.length && styles.container,
            styles.padding,
          ]}
          data={projects}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
          ItemSeparatorComponent={Separator}
        />
        <Loading isLoading={isLoading} />
      </Fragment>
    </LayoutPrimary>
  )
}

export default Projects
