import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import HomeHeader from './HomeHeader'
import HomeAction from './HomeAction'
import TaskSummary from './TaskSummary'
import TeamMember from './TeamMember'
import RecentTask from './RecentTask'
import LayoutPrimary from 'components/LayoutPrimary'

const Home = () => {
  const name = 'Toan'

  const renderHeader = useCallback(() => <HomeHeader name={name} />, [])
  return (
    <LayoutPrimary renderHeader={renderHeader}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeAction />
        <TaskSummary />
        <TeamMember />
        <RecentTask />
      </ScrollView>
    </LayoutPrimary>
  )
}

export default Home
