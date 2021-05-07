import React, {
  useCallback,
  useMemo,
  useEffect,
  Fragment,
  useState,
} from 'react'
import { StyleSheet, View, RefreshControl } from 'react-native'
import SecondaryLayout from 'components/SecondaryLayout'
import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { getTaskState, getTaskData } from 'store/tasks/selectors'
import Loading from 'components/Loading'
import Text from 'components/Text'
import { fetchTask } from 'store/tasks/actions'
import { resetTask } from 'store/tasks/task.slice'
import { ScrollView } from 'react-native-gesture-handler'
import Touchable from 'components/Touchable'
import Icon from 'components/Icon'
import AppStyles from 'config/styles'
import BottomSheet from 'components/BottomSheet'
import NavigationService from 'navigation/NavigationService'

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
})

const TaskDetail = ({ route }: any) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const { isLoading } = useSelector(getTaskState)

  const {
    name,
    description,
    CreatedAt,
    creator_id,
    status,
    subtasks,
    users,
  } = useSelector(getTaskData)

  const ID = useMemo(() => get(route, 'params.ID'), [route])

  const onRefresh = useCallback(() => {
    dispatch(fetchTask(ID))
  }, [ID, dispatch])

  useEffect(() => {
    onRefresh()
    return () => {
      dispatch(resetTask())
    }
  }, [dispatch, onRefresh])

  const renderHeaderTitle = useCallback(() => {}, [])

  return (
    <SecondaryLayout renderHeaderTitle={renderHeaderTitle} hasFooter={false}>
      <Fragment>
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isLoading} />
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
        </ScrollView>
        <Loading isLoading={isLoading} />
        <BottomSheet
          isOpen={visible}
          onClosed={() => setVisible(false)}
          title="Actions">
          <Touchable
            style={styles.sheet}
            onPress={() =>
              NavigationService.navigate('Modal', {
                screen: 'UpdateTask',
                params: { data: { name, description }, ID },
              })
            }>
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
          <Touchable style={styles.sheet}>
            <Icon
              size={16}
              name="calendar"
              color={AppStyles.color.GRAY}
              style={{ marginRight: 8 }}
            />
            <Text gray type="h5">
              Create a subtask
            </Text>
          </Touchable>
          <Touchable style={styles.sheet}>
            <Icon
              size={16}
              name="account-multiple"
              color={AppStyles.color.GRAY}
              style={{ marginRight: 8 }}
            />
            <Text gray type="h5">
              View all assignees
            </Text>
          </Touchable>
          <Touchable style={styles.sheet}>
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
