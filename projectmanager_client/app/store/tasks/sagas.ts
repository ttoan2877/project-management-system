import { takeEvery, put, call, select } from 'redux-saga/effects'
import {
  createTask,
  updateTask,
  changeStatus,
  updateSubtask,
  createSubtask,
} from './actions'
import { startTask, taskSuccess, taskFail, resetTask } from './task.slice'
import TaskAction, { ITask } from 'models/store/TaskAction.type'
import { get } from 'lodash'
import ProjectService from 'services/ProjectService'
import TaskService from 'services/TaskService'
import { TaskRequest } from 'models/api/task'
import { getProjectData } from 'store/project/selectors'
import NavigationService from 'navigation/NavigationService'
import { fetchProjectTask } from 'store/project/actions'

function* createTaskSaga({ payload }: ITask<TaskRequest>) {
  try {
    yield put(startTask())
    const { ID: project_id } = yield select(getProjectData)
    yield call([TaskService, 'createTask'], { ...payload, project_id })
    yield put(taskSuccess(null))
    yield put(fetchProjectTask())
    NavigationService.goBack()
  } catch (e) {
    yield put(taskFail(e))
  }
}

function* updateTaskSaga({ payload }: ITask<TaskRequest>) {
  try {
    yield put(startTask())

    const res = yield call([ProjectService, 'updateProject'], payload)

    yield put(taskSuccess(get(res, 'project')))
  } catch (e) {
    yield put(taskFail(e))
  }
}

export default function* taskSagas() {
  yield takeEvery<TaskAction<TaskRequest>>(
    createTask.toString(),
    createTaskSaga,
  )

  yield takeEvery<TaskAction<TaskRequest>>(
    updateTask.toString(),
    updateTaskSaga,
  )
}
