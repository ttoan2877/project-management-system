import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Icon from 'components/Icon'

import Home from 'screens/Home'
import Setting from 'screens/Setting'
import Tasks from 'screens/Tasks'
import Members from 'screens/Members'
import Reports from 'screens/Reports'

const Tab = createBottomTabNavigator()

const DashboardTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Task"
        component={Tasks}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="check-box-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Reports}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-month-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Member"
        component={Members}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default DashboardTab
