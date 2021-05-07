import React, { Fragment } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

import { navigationRef } from './NavigationService'

import DashboardTab from './NavigationTab'
import Auth from 'screens/Auth'
import { getAuthData } from 'store/auth/selectors'
import ModalStack from './MolalStack'
import { getProjectData } from 'store/project/selectors'
import ProjectStack from './ProjectStack'

const Stack = createStackNavigator()

const App = () => {
  const user = useSelector(getAuthData)
  const project = useSelector(getProjectData)

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none">
        {user.ID ? (
          project.ID ? (
            <Fragment>
              <Stack.Screen name="Main" component={DashboardTab} />
              <Stack.Screen name="Modal" component={ModalStack} />
            </Fragment>
          ) : (
            <Stack.Screen name="Projects" component={ProjectStack} />
          )
        ) : (
          <Stack.Screen name="Login" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
