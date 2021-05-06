import { takeEvery, put, call } from 'redux-saga/effects'
import { fetchUserProject } from './actions'
import {
  startUserProject,
  userProjectSuccess,
  userProjectFail,
} from './userProject.slice'
import TaskAction from 'models/store/TaskAction.type'
import { get } from 'lodash'
import UserService from 'services/UserService'

function* fetchUserProjectSaga() {
  try {
    yield put(startUserProject())

    const res = yield call([UserService, 'fetchUserProject'])

    yield put(userProjectSuccess(get(res, 'project')))
  } catch (e) {
    yield put(userProjectFail(e))
  }
}

export default function* fetchUserProjectSagas() {
  yield takeEvery<TaskAction<void>>(
    fetchUserProject.toString(),
    fetchUserProjectSaga,
  )
}
