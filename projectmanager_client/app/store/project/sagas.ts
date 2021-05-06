import { takeEvery, put, call } from 'redux-saga/effects'
import {
  createProject,
  updateProject,
  fetchProject,
  switchProject,
} from './actions'
import {
  startProject,
  projectSuccess,
  projectFail,
  resetProject,
} from './project.slice'
import TaskAction, { ITask } from 'models/store/TaskAction.type'
import { get } from 'lodash'
import ProjectService from 'services/ProjectService'
import { ProjectRequest } from 'models/api/project'
import NavigationService from 'navigation/NavigationService'

function* createProjectSaga({ payload }: ITask<ProjectRequest>) {
  try {
    yield put(startProject())

    const res = yield call([ProjectService, 'createProject'], payload)

    yield put(projectSuccess(get(res, 'project')))
  } catch (e) {
    yield put(projectFail(e))
  }
}

function* updateProjectSaga({ payload }: ITask<ProjectRequest>) {
  try {
    yield put(startProject())

    const res = yield call([ProjectService, 'updateProject'], payload)

    yield put(projectSuccess(get(res, 'project')))
  } catch (e) {
    yield put(projectFail(e))
  }
}

function* fetchProjectSaga({ payload }: ITask<number>) {
  try {
    yield put(startProject())

    const res = yield call([ProjectService, 'fetchProject'], payload)

    yield put(projectSuccess(get(res, 'project')))

    NavigationService.goBack()
  } catch (e) {
    yield put(projectFail(e))
  }
}

function* switchProjectSaga() {
  try {
    yield put(resetProject())
  } catch (e) {}
}

export default function* projectSagas() {
  yield takeEvery<TaskAction<ProjectRequest>>(
    createProject.toString(),
    createProjectSaga,
  )

  yield takeEvery<TaskAction<ProjectRequest>>(
    updateProject.toString(),
    updateProjectSaga,
  )

  yield takeEvery<TaskAction<number>>(fetchProject.toString(), fetchProjectSaga)

  yield takeEvery<TaskAction<void>>(switchProject.toString(), switchProjectSaga)
}
