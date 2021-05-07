import { all } from 'redux-saga/effects'
import authSagas from './auth/sagas'
import projectSagas from './project/sagas'
import fetchUserProjectSagas from './userProject/sagas'
import taskSagas from './tasks/sagas'
import fetchAllUserSagas from './user/sagas'
import updateInfoSagas from './info/sagas'
import fetchMyTaskSagas from './myTask/sagas'

export default function* rootSagas() {
  yield all([
    authSagas(),
    projectSagas(),
    taskSagas(),
    fetchUserProjectSagas(),
    fetchAllUserSagas(),
    updateInfoSagas(),
    fetchMyTaskSagas(),
  ])
}
