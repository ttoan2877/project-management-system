import React, { useEffect, Fragment, useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Separator from 'components/Separator'
import Loading from 'components/Loading'
import AppStyles from 'config/styles'

import { get } from 'lodash'
import Card from 'components/Card'
import { getUserData, getUserState, getUserToAdd } from 'store/user/selectors'
import { fetchAllUser } from 'store/user/actions'
import SecondaryLayout from 'components/SecondaryLayout'
import { addMember } from 'store/project/actions'
import { getProjectState } from 'store/project/selectors'

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

const SearchUser = () => {
  const dispatch = useDispatch()
  const data = useSelector(getUserToAdd)
  const { isLoading: fetching } = useSelector(getUserState)
  const { isLoading } = useSelector(getProjectState)

  const onUser = useCallback(
    (ID: number) => {
      dispatch(addMember(ID))
    },
    [dispatch],
  )

  const onRefresh = useCallback(() => {
    dispatch(fetchAllUser())
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
          onPress={() => onUser(get(item, 'ID'))}
        />
      )
    },
    [onUser],
  )
  return (
    <SecondaryLayout title="Select user" hasFooter={false}>
      <Fragment>
        <FlatList
          onRefresh={onRefresh}
          refreshing={fetching}
          showsVerticalScrollIndicator={false}
          style={styles.container}
          data={data}
          contentContainerStyle={[
            !data?.length && styles.container,
            styles.padding,
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={Separator}
        />
        <Loading isLoading={fetching || isLoading} />
      </Fragment>
    </SecondaryLayout>
  )
}

export default SearchUser
