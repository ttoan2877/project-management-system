import { authReducer } from './auth/auth.slice'
import { projectReducer } from './project/project.slice'

const rootReducers = {
  auth: authReducer,
  project: projectReducer,
}

export default rootReducers
