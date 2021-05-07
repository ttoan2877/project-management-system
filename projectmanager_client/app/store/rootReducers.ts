import { authReducer } from './auth/auth.slice'
import { projectReducer } from './project/project.slice'
import { userProjectReducer } from './userProject/userProject.slice'
import { TaskReducer } from './tasks/task.slice'
import { userReducer } from './user/user.slice'

const rootReducers = {
  auth: authReducer,
  project: projectReducer,
  task: TaskReducer,
  user: userReducer,
  userProject: userProjectReducer,
}

export default rootReducers
