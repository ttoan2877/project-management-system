import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Projects from 'screens/Projects'
import CreateProject from 'screens/Projects/CreateProject'

const Stack = createStackNavigator()

const ProjectStack = () => {
  return (
    <Stack.Navigator initialRouteName="Project" headerMode="none">
      <Stack.Screen name="Project" component={Projects} />
      <Stack.Screen name="CreateProject" component={CreateProject} />
    </Stack.Navigator>
  )
}

export default ProjectStack
