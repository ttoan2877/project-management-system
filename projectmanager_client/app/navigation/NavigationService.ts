import { createRef } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createRef<NavigationContainerRef>()

function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params)
}

function goBack() {
  navigationRef.current?.goBack()
}

export default {
  navigate,
  goBack,
}
