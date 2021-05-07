import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import TaskDetail from 'screens/Tasks/TaskDetail'
import MemberDetail from 'screens/Members/MemberDetail'
import CreateTask from 'screens/Tasks/CreateTask'

const Stack = createStackNavigator()

const ModalStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
      <Stack.Screen name="CreateTask" component={CreateTask} />
      <Stack.Screen name="MemberDetail" component={MemberDetail} />
    </Stack.Navigator>
  )
}

export default ModalStack
