import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import TaskDetail from 'screens/Tasks/TaskDetail'
import MemberDetail from 'screens/Members/MemberDetail'
import CreateTask from 'screens/Tasks/CreateTask'
import UpdateTask from 'screens/Tasks/UpdateTask'
import SearchUser from 'screens/SearchUser'

const Stack = createStackNavigator()

const ModalStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
      <Stack.Screen name="UpdateTask" component={UpdateTask} />
      <Stack.Screen name="CreateTask" component={CreateTask} />
      <Stack.Screen name="MemberDetail" component={MemberDetail} />
      <Stack.Screen name="SearchUser" component={SearchUser} />
    </Stack.Navigator>
  )
}

export default ModalStack
