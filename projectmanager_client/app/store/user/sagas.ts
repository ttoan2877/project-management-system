import { takeEvery, put, call } from 'redux-saga/effects'
import { fetchAllUser } from './actions'
import { startUser, userSuccess, userFail } from './user.slice'
import TaskAction from 'models/store/TaskAction.type'
import UserService from 'services/UserService'
import { get } from 'lodash'

function* fetchAllUserSaga() {
  try {
    yield put(startUser())
    const res = yield call([UserService, 'fetchAllUser'])
    yield put(userSuccess(get(res, 'result', [])))
  } catch (e) {
    yield put(userFail(e))
  }
}

export default function* fetchAllUserSagas() {
  yield takeEvery<TaskAction<void>>(fetchAllUser.toString(), fetchAllUserSaga)
}
