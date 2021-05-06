import { takeEvery, put, call } from 'redux-saga/effects'
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
import { ProjectRequest } from 'models/api/project'

function* createTaskSaga({ payload }: ITask<ProjectRequest>) {
  try {
    yield put(startTask())

    const res = yield call([ProjectService, 'createProject'], payload)

    yield put(taskSuccess(get(res, 'project')))
  } catch (e) {
    yield put(taskFail(e))
  }
}

function* updateTaskSaga({ payload }: ITask<ProjectRequest>) {
  try {
    yield put(startTask())

    const res = yield call([ProjectService, 'updateProject'], payload)

    yield put(taskSuccess(get(res, 'project')))
  } catch (e) {
    yield put(taskFail(e))
  }
}

function* fetchProjectSaga({ payload }: ITask<number>) {
  try {
    yield put(startTask())

    const res = yield call([ProjectService, 'fetchProject'], payload)

    yield put(taskSuccess(get(res, 'project')))
  } catch (e) {
    yield put(taskFail(e))
  }
}

export default function* projectSagas() {
  yield takeEvery<TaskAction<ProjectRequest>>(
    createTask.toString(),
    createTaskSaga,
  )

  yield takeEvery<TaskAction<ProjectRequest>>(
    updateTask.toString(),
    updateTaskSaga,
  )
}
