import { authReducer } from './auth/auth.slice'
import { projectReducer } from './project/project.slice'
import { userProjectReducer } from './userProject/userProject.slice'
import { userProjectTaskReducer } from './userProjectTask/userProjectTask.slice'

const rootReducers = {
  auth: authReducer,
  project: projectReducer,
  userProject: userProjectReducer,
  userProjectTask: userProjectTaskReducer,
}

export default rootReducers
