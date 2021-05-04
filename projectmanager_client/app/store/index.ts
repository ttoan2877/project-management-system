import {
  applyMiddleware,
  compose,
  createStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-community/async-storage'
import createSagaMiddleware from 'redux-saga'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { persistReducer, persistStore } from 'redux-persist'
import { reset } from './auth/actions'
import rootReducers from './rootReducers'
import rootSagas from './rootSagas'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
}

function configureStore(initialState = {}) {
  const appReducer = combineReducers({ ...rootReducers })
  const rootReducer = (state: any, action: any) => {
    if (action.type === reset.toString()) {
      return appReducer(undefined, action)
    }
    return appReducer(state, action)
  }
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
      immutableCheck: false,
    }),
    sagaMiddleware,
  ]

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  const store = createStore(
    persistedReducer,
    initialState as any,
    composeEnhancers(applyMiddleware(...middlewares)),
  )

  const persistor = persistStore(store)

  sagaMiddleware.run(rootSagas)

  return { store, persistor }
}

const { store, persistor } = configureStore()
export { store, persistor }
