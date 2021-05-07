import { takeEvery, put, call, select } from 'redux-saga/effects'
import {
  createProject,
  updateProject,
  fetchProject,
  switchProject,
  fetchProjectTask,
  fetchProjectMember,
  addMember,
  removeMember,
  setMemberRole,
} from './actions'
import {
  startProject,
  projectSuccess,
  projectFail,
  resetProject,
  projectTaskSuccess,
  projectMemberSuccess,
  setRole,
} from './project.slice'
import TaskAction, { ITask } from 'models/store/TaskAction.type'
import { get } from 'lodash'
import ProjectService from 'services/ProjectService'
import { ProjectRequest } from 'models/api/project'
import NavigationService from 'navigation/NavigationService'
import { getProjectData } from './selectors'
import { fetchMyTask } from 'store/myTask/actions'
import ApiConfig from 'config/api-config'

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
    const { ID } = yield select(getProjectData)
    yield call([ProjectService, 'updateProject'], { ...payload, ID })
    yield put(projectSuccess(null))
    yield put(fetchProject(ID))
  } catch (e) {
    yield put(projectFail(e))
  }
}

function* fetchProjectSaga({ payload }: ITask<number>) {
  try {
    yield put(startProject())
    const res = yield call([ProjectService, 'fetchProject'], payload)
    yield put(projectSuccess(get(res, 'project')))
    yield put(setRole(get(res, 'role')))
    yield put(fetchProjectTask())
    yield put(fetchProjectMember())
    yield put(fetchMyTask())
  } catch (e) {
    yield put(projectFail(e))
  }
}

function* fetchProjectTaskSaga() {
  try {
    yield put(startProject())
    const { ID } = yield select(getProjectData)
    const res = yield call([ProjectService, 'fetchTaskProject'], ID)
    yield put(projectTaskSuccess(get(res, 'result')))
  } catch (e) {
    yield put(projectFail(e))
  }
}

function* fetchProjectMemberSaga() {
  try {
    yield put(startProject())
    const { ID } = yield select(getProjectData)
    const res = yield call([ProjectService, 'fetchUserProject'], ID)
    yield put(projectMemberSuccess(get(res, 'result')))
  } catch (e) {
    yield put(projectFail(e))
  }
}

function* switchProjectSaga() {
  try {
    yield put(resetProject())
  } catch (e) {}
}

function* addMemberSaga({ payload: user_id }: ITask<number>) {
  try {
    yield put(startProject())
    const { ID: project_id } = yield select(getProjectData)
    const res = yield call([ProjectService, 'addUser'], { project_id, user_id })
    yield put(projectMemberSuccess(get(res, 'result')))
    yield put(fetchProject(project_id))
    NavigationService.goBack()
  } catch (e) {
    yield put(projectFail(e))
  }
}

function* removeMemberSaga({ payload: user_id }: ITask<number>) {
  try {
    yield put(startProject())
    const { ID: project_id } = yield select(getProjectData)

    const res = yield call([ProjectService, 'removeUser'], {
      project_id,
      user_id,
    })
    yield put(projectMemberSuccess(get(res, 'result')))
    yield put(fetchProject(project_id))
    NavigationService.goBack()
  } catch (e) {
    yield put(projectFail(e))
  }
}

function* setMemberRoleSaga({ payload }: ITask<any>) {
  try {
    yield put(startProject())
    const { ID: project_id } = yield select(getProjectData)

    const res = yield call([ProjectService, 'setRole'], {
      project_id,
      user_id: payload.user_id,
      url: payload.isAdmin
        ? ApiConfig.PROJECT.SET_ADMIN
        : ApiConfig.PROJECT.SET_MEMBER,
    })
    yield put(projectMemberSuccess(get(res, 'result')))
    yield put(fetchProject(project_id))
    NavigationService.goBack()
  } catch (e) {
    yield put(projectFail(e))
  }
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

  yield takeEvery<TaskAction<void>>(
    fetchProjectTask.toString(),
    fetchProjectTaskSaga,
  )

  yield takeEvery<TaskAction<void>>(
    fetchProjectMember.toString(),
    fetchProjectMemberSaga,
  )

  yield takeEvery<TaskAction<number>>(addMember.toString(), addMemberSaga)

  yield takeEvery<TaskAction<number>>(removeMember.toString(), removeMemberSaga)

  yield takeEvery<TaskAction<number>>(fetchProject.toString(), fetchProjectSaga)

  yield takeEvery<TaskAction<void>>(switchProject.toString(), switchProjectSaga)

  yield takeEvery<TaskAction<any>>(setMemberRole.toString(), setMemberRoleSaga)
}
