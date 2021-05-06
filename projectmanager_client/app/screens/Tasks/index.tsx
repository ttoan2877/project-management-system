import React, { useEffect, Fragment } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import LayoutPrimary from 'components/LayoutPrimary'
import { useDispatch } from 'react-redux'

const Tasks = () => {
  const dispatch = useDispatch()
  const { isLoading , data} = useSelector(getProjectState)

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
  useEffect(() => {}, [])
  return <LayoutPrimary title="Choose your project" renderFooter={renderFooter}>
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

export default Tasks

const styles = StyleSheet.create({})
