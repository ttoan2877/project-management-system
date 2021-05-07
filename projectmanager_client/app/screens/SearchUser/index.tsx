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

import { get } from 'lodash'
import Card from 'components/Card'
import { getUserData, getUserState } from 'store/user/selectors'
import { fetchAllUser } from 'store/user/actions'
import SecondaryLayout from 'components/SecondaryLayout'

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
  const data = useSelector(getUserData)
  const { isLoading } = useSelector(getUserState)

  const onUser = useCallback((ID: number) => {
    // dispatch()
  }, [])

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
          refreshing={isLoading}
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
        <Loading isLoading={isLoading} />
      </Fragment>
    </SecondaryLayout>
  )
}

export default SearchUser
