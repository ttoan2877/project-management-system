import { takeEvery, put, call, select } from 'redux-saga/effects'
import { fetchMyTask } from './actions'
import { startMyTask, myTaskSuccess, myTaskFail } from './myTask.slice'
import TaskAction from 'models/store/TaskAction.type'
import { get } from 'lodash'
import ProjectService from 'services/ProjectService'
import { getProjectData } from 'store/project/selectors'
import { getAuthData } from 'store/auth/selectors'

function* fetchMyTaskSaga() {
  const { ID: project_id } = yield select(getProjectData)
  const { ID: user_id } = yield select(getAuthData)

  try {
    yield put(startMyTask())

    const res = yield call([ProjectService, 'fetchMyTask'], {
      project_id,
      user_id,
    })

    yield put(myTaskSuccess(get(res, 'result')))
  } catch (e) {
    yield put(myTaskFail(e))
  }
}

export default function* fetchMyTaskSagas() {
  yield takeEvery<TaskAction<void>>(fetchMyTask.toString(), fetchMyTaskSaga)
}
