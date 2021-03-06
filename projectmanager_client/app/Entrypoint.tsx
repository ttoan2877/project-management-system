import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import Navigator from 'navigation'
import { store, persistor } from 'store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Portal } from 'react-native-paper'

const Entrypoint = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Portal.Host>
            <Navigator />
          </Portal.Host>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default Entrypoint
