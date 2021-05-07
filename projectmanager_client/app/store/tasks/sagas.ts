import { takeEvery, put, call, select } from 'redux-saga/effects'
import {
  createTask,
  updateTask,
  changeStatus,
  updateSubtask,
  createSubtask,
  fetchTask,
} from './actions'
import { startTask, taskSuccess, taskFail } from './task.slice'
import TaskAction, { ITask } from 'models/store/TaskAction.type'
import { get } from 'lodash'
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

    yield call([TaskService, 'updateTask'], payload)

    yield put(taskSuccess(null))
    if (payload.ID) yield put(fetchTask(payload.ID))
    NavigationService.goBack()
  } catch (e) {
    yield put(taskFail(e))
  }
}

function* fetchTaskSaga({ payload }: ITask<number>) {
  try {
    yield put(startTask())

    const res = yield call([TaskService, 'fetchTask'], payload)

    yield put(taskSuccess(get(res, 'task')))
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
  yield takeEvery<TaskAction<number>>(fetchTask.toString(), fetchTaskSaga)
}
