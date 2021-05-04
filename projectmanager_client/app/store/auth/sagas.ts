import { takeEvery, put, call } from 'redux-saga/effects'
import { login, logout, reset } from './actions'

import { startAuth, authSuccess, authFail } from './auth.slice'

import TaskAction, { ITask } from 'models/store/TaskAction.type'
import AuthService from 'services/AuthService'
import { get } from 'lodash'
import { LoginRequest } from 'models/api/login'

function* loginSaga({ payload }: ITask<LoginRequest>) {
  try {
    yield put(startAuth())

    const res = yield call([AuthService, 'login'], payload)
    yield put(authSuccess(get(res, 'user')))
  } catch (e) {
    yield put(authFail(e))
  }
}

function* logoutSaga() {
  try {
    yield put(reset())
  } catch (e) {}
}

export default function* authSagas() {
  yield takeEvery<TaskAction<LoginRequest>>(login.toString(), loginSaga)
  yield takeEvery<TaskAction<void>>(logout.toString(), logoutSaga)
}
