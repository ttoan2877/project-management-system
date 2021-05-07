import { takeEvery, put, call } from 'redux-saga/effects'
import { updateInfo } from './actions'
import { startInfo, infoSuccess, infoFail } from './info.slice'
import TaskAction, { ITask } from 'models/store/TaskAction.type'
import UserService from 'services/UserService'
import { UserRequest } from 'models/api/user'
import NavigationService from 'navigation/NavigationService'

function* updateInfoSaga({ payload }: ITask<UserRequest>) {
  try {
    yield put(startInfo())
    yield call([UserService, 'updateUser'], payload)
    yield put(infoSuccess())
    NavigationService.goBack()
  } catch (e) {
    yield put(infoFail(e))
  }
}

export default function* updateInfoSagas() {
  yield takeEvery<TaskAction<UserRequest>>(
    updateInfo.toString(),
    updateInfoSaga,
  )
}
