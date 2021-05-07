import { takeEvery, put, call, select } from 'redux-saga/effects'
import {
  createTask,
  updateTask,
  changeStatus,
  fetchTask,
  fetchAssignee,
  assignMember,
  unassignMember,
} from './actions'
import {
  startTask,
  taskSuccess,
  taskFail,
  taskAssigneeSuccess,
} from './task.slice'
import TaskAction, { ITask } from 'models/store/TaskAction.type'
import { get } from 'lodash'
import TaskService from 'services/TaskService'
import { TaskRequest, ChangeStatusRequest, Status } from 'models/api/task'
import { getProjectData } from 'store/project/selectors'
import NavigationService from 'navigation/NavigationService'
import { fetchProjectTask } from 'store/project/actions'
import { getTaskData } from './selectors'

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

function* fetchAssigneeSaga({ payload }: ITask<number>) {
  try {
    yield put(startTask())
    const res = yield call([TaskService, 'fetchUserTask'], payload)
    yield put(taskAssigneeSuccess(get(res, 'result')))
  } catch (e) {
    yield put(taskFail(e))
  }
}

function* assignMemberSaga({ payload: user_id }: ITask<number>) {
  try {
    yield put(startTask())
    const { ID: task_id } = yield select(getTaskData)
    yield call([TaskService, 'assignUser'], { task_id, user_id })
    yield put(taskSuccess(null))
    yield put(fetchTask(task_id))
    NavigationService.goBack()
  } catch (e) {
    yield put(taskFail(e))
  }
}

function* unassignMemberSaga({ payload: user_id }: ITask<number>) {
  try {
    yield put(startTask())
    const { ID: task_id } = yield select(getTaskData)
    yield call([TaskService, 'unassignUser'], { user_id, task_id })
    yield put(taskSuccess(null))
    yield put(fetchTask(task_id))
    NavigationService.goBack()
  } catch (e) {
    yield put(taskFail(e))
  }
}

function* changeStatusSaga({ payload }: ITask<Status>) {
  try {
    yield put(startTask())
    const { ID: task_id } = yield select(getTaskData)
    yield call([TaskService, 'changeStatus'], task_id, payload)
    yield put(taskSuccess(null))
    yield put(fetchTask(task_id))
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

  yield takeEvery<TaskAction<number>>(
    fetchAssignee.toString(),
    fetchAssigneeSaga,
  )

  yield takeEvery<TaskAction<number>>(
    unassignMember.toString(),
    unassignMemberSaga,
  )

  yield takeEvery<TaskAction<Status>>(changeStatus.toString(), changeStatusSaga)

  yield takeEvery<TaskAction<number>>(fetchTask.toString(), fetchTaskSaga)

  yield takeEvery<TaskAction<number>>(assignMember.toString(), assignMemberSaga)
}
