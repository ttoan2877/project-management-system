import React, { useCallback } from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import HomeHeader from './HomeHeader'
import HomeAction from './HomeAction'
import TaskSummary from './TaskSummary'
import TeamMember from './TeamMember'
import RecentTask from './RecentTask'
import LayoutPrimary from 'components/LayoutPrimary'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthData } from 'store/auth/selectors'
import { getProjectState, getProjectData } from 'store/project/selectors'
import { fetchProject } from 'store/project/actions'

const Home = () => {
  const dispatch = useDispatch()
  const { fullname, avatar } = useSelector(getAuthData)
  const { isLoading } = useSelector(getProjectState)
  const { users, ID } = useSelector(getProjectData)

  const renderHeader = useCallback(
    () => <HomeHeader name={fullname} avatar={avatar} />,
    [avatar, fullname],
  )

  const onRefresh = useCallback(() => {
    dispatch(fetchProject(ID))
  }, [ID, dispatch])
  return (
    <LayoutPrimary renderHeader={renderHeader}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        <HomeAction />
        <TaskSummary />
        <TeamMember users={users} />
        <RecentTask />
      </ScrollView>
    </LayoutPrimary>
  )
}

export default Home
