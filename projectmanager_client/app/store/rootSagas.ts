import { all } from 'redux-saga/effects'
import authSagas from './auth/sagas'
import projectSagas from './project/sagas'
import fetchUserProjectSagas from './userProject/sagas'

export default function* rootSagas() {
  yield all([
    //
    authSagas(),
    projectSagas(),
    fetchUserProjectSagas(),
  ])
}
