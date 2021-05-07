import React, { useEffect, Fragment, useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import LayoutPrimary from 'components/LayoutPrimary'
import { useDispatch, useSelector } from 'react-redux'
import Separator from 'components/Separator'
import Loading from 'components/Loading'
import Text from 'components/Text'
import AppStyles from 'config/styles'
import FloatingButton from 'components/FloatingButton'
import NavigationService from 'navigation/NavigationService'
import { fetchProjectTask } from 'store/project/actions'
import { getProjectTask, getProjectState } from 'store/project/selectors'
import { get } from 'lodash'
import Card from 'components/Card'

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
    <Text>Please create a task</Text>
  </View>
)

const Tasks = () => {
  const dispatch = useDispatch()
  const data = useSelector(getProjectTask)
  const { isLoading } = useSelector(getProjectState)

  const onCreate = useCallback(() => {
    NavigationService.navigate('Modal', { screen: 'CreateTask' })
  }, [])

  const onTaskDetail = useCallback((ID: number) => {
    NavigationService.navigate('Modal', {
      screen: 'TaskDetail',
      params: { ID },
    })
  }, [])

  const onRefresh = useCallback(() => {
    dispatch(fetchProjectTask())
  }, [dispatch])

  useEffect(() => {
    onRefresh()
  }, [onRefresh])

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Card
          name={get(item, 'name', '')}
          description={get(item, 'description', '')}
          created_at={get(item, 'CreatedAt', '')}
          users={get(item, 'users', [])}
          onPress={() => onTaskDetail(get(item, 'ID'))}
        />
      )
    },
    [onTaskDetail],
  )
  // useEffect(() => {}, [])
  return (
    <LayoutPrimary title="Task list">
      <Fragment>
        <FlatList
          onRefresh={onRefresh}
          refreshing={isLoading}
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={[
            !data?.length && styles.container,
            styles.padding,
          ]}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
          ItemSeparatorComponent={Separator}
        />
        <Loading isLoading={isLoading} />
        <FloatingButton icon="plus" onPress={onCreate} />
      </Fragment>
    </LayoutPrimary>
  )
}
export default Tasks
