import React, { useCallback } from 'react'
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
})

const ListEmptyComponent = () => (
  <View style={[styles.container, styles.center]}>
    <Text>Please create a project</Text>
  </View>
)

const ListFooterComponent = () => (
  <Touchable onPress={() => NavigationService.navigate('CreateProject')}>
    <Text>New project</Text>
  </Touchable>
)

const Projects = () => {
  const dispatch = useDispatch()
  const { projects, ID } = useSelector(getAuthData)
  const { isLoading } = useSelector(getProjectState)

  const onProject = useCallback(
    (ID: number) => {
      dispatch(fetchProject(ID))
    },
    [dispatch],
  )

  const renderItem = useCallback(
    ({ item }) => {
      const isOwner = get(item, 'creator_id') === ID
      return (
        <Card
          name={get(item, 'name', '')}
          description={get(item, 'description', '')}
          created_at={get(item, 'CreatedAt', '')}
          isOwner={isOwner}
          onPress={() => onProject(get(item, 'ID'))}
        />
      )
    },
    [ID, onProject],
  )

  return (
    <>
      <LayoutPrimary title="Choose your project">
        <FlatList
          style={styles.container}
          contentContainerStyle={[styles.container, styles.padding]}
          data={projects}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
          ItemSeparatorComponent={Separator}
        />
      </LayoutPrimary>
      <Loading isLoading={isLoading} />
    </>
  )
}

export default Projects
