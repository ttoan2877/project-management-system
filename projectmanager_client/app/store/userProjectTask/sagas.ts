import { takeEvery, put, call, select } from 'redux-saga/effects'
import { fetchUserProjectTask } from './actions'
import {
  startUserProjectTask,
  userProjectTaskSuccess,
  userProjectTaskFail,
} from './userProjectTask.slice'
import TaskAction from 'models/store/TaskAction.type'
import { get } from 'lodash'
import ProjectService from 'services/ProjectService'
import { getAuthData } from 'store/auth/selectors'
import { getProjectData } from 'store/project/selectors'

function* fetchUserProjectTaskSaga() {
  try {
    const { ID: user_id } = yield select(getAuthData)
    const { ID: project_id } = yield select(getProjectData)
    yield put(startUserProjectTask())

    const res = yield call([ProjectService, 'fetchUserTaskProject'], {
      user_id,
      project_id,
    })

    yield put(userProjectTaskSuccess(get(res, 'ProjectTask')))
  } catch (e) {
    yield put(userProjectTaskFail(e))
  }
}

export default function* fetchUserProjectTaskSagas() {
  yield takeEvery<TaskAction<void>>(
    fetchUserProjectTask.toString(),
    fetchUserProjectTaskSaga,
  )
}
