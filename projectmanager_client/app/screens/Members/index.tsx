import React, { useEffect, Fragment, useCallback, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import LayoutPrimary from 'components/LayoutPrimary'
import { useDispatch, useSelector } from 'react-redux'
import Separator from 'components/Separator'
import Loading from 'components/Loading'
import Text from 'components/Text'
import AppStyles from 'config/styles'
import FloatingButton from 'components/FloatingButton'
import NavigationService from 'navigation/NavigationService'
import { fetchProjectMember } from 'store/project/actions'
import {
  getProjectState,
  getProjectMember,
  getCurrentRole,
} from 'store/project/selectors'
import { get, clone } from 'lodash'
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

const Members = () => {
  const dispatch = useDispatch()
  const data = useSelector(getProjectMember)
  const { isLoading } = useSelector(getProjectState)
  const role = useSelector(getCurrentRole)

  const onAddMember = useCallback(() => {
    NavigationService.navigate('Modal', { screen: 'SearchUser' })
  }, [])

  const onMemberDetail = useCallback((item: any) => {
    NavigationService.navigate('Modal', {
      screen: 'MemberDetail',
      params: { item },
    })
  }, [])

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
          onPress={() => onMemberDetail(item)}
        />
      )
    },
    [onMemberDetail],
  )

  const convertData = useMemo(() => (data ? clone(data).reverse() : []), [data])

  return (
    <LayoutPrimary title="Member">
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
          data={convertData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
          ItemSeparatorComponent={Separator}
        />
        <Loading isLoading={isLoading} />
        {role === 'admin' && (
          <FloatingButton icon="account-multiple" onPress={onAddMember} />
        )}
      </Fragment>
    </LayoutPrimary>
  )
}

export default Members
