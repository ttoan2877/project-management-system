import { authReducer } from './auth/auth.slice'
import { projectReducer } from './project/project.slice'
import { userProjectReducer } from './userProject/userProject.slice'
import { TaskReducer } from './tasks/task.slice'

const rootReducers = {
  auth: authReducer,
  project: projectReducer,
  task: TaskReducer,
  userProject: userProjectReducer,
}

export default rootReducers
