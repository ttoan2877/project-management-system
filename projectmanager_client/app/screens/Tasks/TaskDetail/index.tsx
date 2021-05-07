import React, {
  useCallback,
  useMemo,
  useEffect,
  Fragment,
  useState,
} from 'react'
import { StyleSheet, View, RefreshControl } from 'react-native'
import SecondaryLayout from 'components/SecondaryLayout'
import { get, stubArray } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { getTaskState, getTaskData } from 'store/tasks/selectors'
import Loading from 'components/Loading'
import Text from 'components/Text'
import { fetchTask, changeStatus } from 'store/tasks/actions'
import { ScrollView } from 'react-native-gesture-handler'
import Touchable from 'components/Touchable'
import Icon from 'components/Icon'
import AppStyles from 'config/styles'
import BottomSheet from 'components/BottomSheet'
import NavigationService from 'navigation/NavigationService'
import { statusArr, Status } from 'models/api/task'
import { getStatusLabel, getStatusColor } from 'utils/status'
import Card from 'components/Card'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  action: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: AppStyles.color.LIGHT_GRAY,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheet: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopColor: AppStyles.color.BACKGROUND,
    borderTopWidth: 1,
  },
  textWrap: {
    borderWidth: 1,
    borderColor: AppStyles.color.LIGHT_GRAY,
    backgroundColor: AppStyles.color.BACKGROUND,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  statusWrap: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBtn: {
    ...AppStyles.common.shadow,
    borderWidth: 1,
    borderColor: AppStyles.color.LIGHT_GRAY,
    padding: 4,
    borderRadius: 8,
  },
})

const TaskDetail = ({ route }: any) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const { isLoading } = useSelector(getTaskState)

  const { name, description, status, users } = useSelector(getTaskData)

  const ID = useMemo(() => get(route, 'params.ID'), [route])

  const onRefresh = useCallback(() => {
    dispatch(fetchTask(ID))
  }, [ID, dispatch])

  useEffect(() => {
    onRefresh()
    return () => setVisible(false)
  }, [dispatch, onRefresh])

  const onChangeStatus = useCallback(
    (status: Status) => {
      dispatch(changeStatus(status))
    },
    [dispatch],
  )

  const onAssigneeDetail = useCallback((item: any) => {}, [])

  const renderItem = useCallback(
    (item: any, index: number) => (
      <View style={{ marginTop: 16 }}>
        <Card
          key={index.toString()}
          name={get(item, 'fullname', '')}
          email={get(item, 'mail', '')}
          userAvatar={get(item, 'avatar', '')}
          onPress={() => onAssigneeDetail(item)}
        />
      </View>
    ),
    [onAssigneeDetail],
  )

  return (
    <SecondaryLayout title="Task detail" hasFooter={false}>
      <Fragment>
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={false} />
          }
          style={styles.container}
          contentContainerStyle={styles.content}>
          <View style={styles.titleWrap}>
            <Text style={{ flex: 1, marginRight: 16 }} type="h3">
              {name}
            </Text>
            <Touchable style={styles.action} onPress={() => setVisible(true)}>
              <Icon
                name="dots-vertical"
                size={16}
                color={AppStyles.color.SECONDARY}
              />
            </Touchable>
          </View>
          <View style={styles.statusWrap}>
            {statusArr.map(item => (
              <Touchable
                onPress={() => onChangeStatus(item)}
                disabled={item === status}
                style={[
                  styles.statusBtn,
                  {
                    backgroundColor:
                      item !== status
                        ? AppStyles.color.SECONDARY
                        : getStatusColor(item),
                  },
                ]}>
                <Text light type="caption" bold>
                  {getStatusLabel(item)}
                </Text>
              </Touchable>
            ))}
          </View>
          <View style={styles.textWrap}>
            <Text gray style={{ flex: 1 }}>
              {description}
            </Text>
          </View>

          {users &&
            users.map((item: any, index: number) => renderItem(item, index))}
        </ScrollView>
        <Loading isLoading={isLoading} />
        <BottomSheet
          isOpen={visible}
          onClosed={() => setVisible(false)}
          title="Actions">
          <Touchable
            style={styles.sheet}
            onPress={() => {
              setVisible(false)
              NavigationService.navigate('Modal', {
                screen: 'UpdateTask',
                params: { data: { name, description }, ID },
              })
            }}>
            <Icon
              size={16}
              name="pencil"
              color={AppStyles.color.GRAY}
              style={{ marginRight: 8 }}
            />
            <Text gray type="h5">
              Edit task information
            </Text>
          </Touchable>
          <Touchable
            style={styles.sheet}
            onPress={() => {
              setVisible(false)
              NavigationService.navigate('Modal', {
                screen: 'SearchMember',
              })
            }}>
            <Icon
              size={16}
              name="account"
              color={AppStyles.color.GRAY}
              style={{ marginRight: 8 }}
            />
            <Text gray type="h5">
              Assign new member
            </Text>
          </Touchable>
        </BottomSheet>
      </Fragment>
    </SecondaryLayout>
  )
}

export default TaskDetail
