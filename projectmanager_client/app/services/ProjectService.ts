import ApiConfig from 'config/api-config'
import BaseService from './BaseService'
import {
  ProjectRequest,
  ProjectUserRequest,
  FetchUserProjectRequest,
  TaskProjectRequest,
  UserTaskProjectRequest,
} from 'models/api/project'

class ProjectService extends BaseService {
  public createProject(req: ProjectRequest) {
    return this.post(ApiConfig.PROJECT.CREATE, req)
  }

  public updateProject(req: ProjectRequest) {
    return this.post(ApiConfig.PROJECT.UPDATE, req)
  }

  public fetchProject(req: number) {
    return this.post(ApiConfig.PROJECT.BY_ID, { project_id: req })
  }

  public addUser(req: ProjectUserRequest) {
    return this.post(ApiConfig.PROJECT.ADD_USER, req)
  }

  public removeUser(req: ProjectUserRequest) {
    return this.post(ApiConfig.PROJECT.REMOVE_USER, req)
  }

  public fetchUserProject(req: FetchUserProjectRequest) {
    return this.post(ApiConfig.PROJECT.FETCH_USER, req)
  }

  public fetchTaskProject(req: TaskProjectRequest) {
    return this.post(ApiConfig.PROJECT.FETCH_TASK, req)
  }

  public fetchUserTaskProject(req: UserTaskProjectRequest) {
    return this.post(ApiConfig.PROJECT.FETCH_USER_TASK, req)
  }
}

export default new ProjectService()
