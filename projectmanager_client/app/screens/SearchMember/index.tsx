import React, { useEffect, Fragment, useCallback, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Separator from 'components/Separator'
import Loading from 'components/Loading'
import AppStyles from 'config/styles'
import FloatingButton from 'components/FloatingButton'
import NavigationService from 'navigation/NavigationService'
import { fetchProjectMember } from 'store/project/actions'
import { getProjectState, getProjectMember } from 'store/project/selectors'
import { get } from 'lodash'
import Card from 'components/Card'
import SecondaryLayout from 'components/SecondaryLayout'
import { assignMember } from 'store/tasks/actions'
import { getTaskData } from 'store/tasks/selectors'

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

const SearchMember = () => {
  const dispatch = useDispatch()
  const data = useSelector(getProjectMember)
  const { isLoading } = useSelector(getProjectState)
  const { users } = useSelector(getTaskData)

  const onAddMember = useCallback(
    (ID: number) => {
      dispatch(assignMember(ID))
    },
    [dispatch],
  )

  const convertedData = useMemo(
    () =>
      (data || []).filter((x: any) => !users.some((y: any) => y.id === x.id)),
    [data, users],
  )

  const onRefresh = useCallback(() => {
    dispatch(fetchProjectMember())
  }, [dispatch])

  useEffect(() => {
    onRefresh()
  }, [onRefresh])

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Card
          name={get(item, 'fullname', '')}
          email={get(item, 'mail', '')}
          userAvatar={get(item, 'avatar', '')}
          onPress={() => onAddMember(get(item, 'id'))}
        />
      )
    },
    [onAddMember],
  )
  return (
    <SecondaryLayout title="Select a member" hasFooter={false}>
      <Fragment>
        <FlatList
          onRefresh={onRefresh}
          refreshing={false}
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={[styles.padding]}
          data={convertedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={Separator}
        />
        <Loading isLoading={isLoading} />
      </Fragment>
    </SecondaryLayout>
  )
}

export default SearchMember
