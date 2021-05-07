import ApiConfig from 'config/api-config'
import BaseService from './BaseService'
import { ProjectRequest, ProjectUserRequest } from 'models/api/project'

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

  public fetchUserProject(req: number) {
    return this.post(ApiConfig.PROJECT.FETCH_USER, {
      project_id: req,
      page_size: 1000,
      page_index: 1,
    })
  }

  public fetchTaskProject(project_id: number) {
    return this.post(ApiConfig.PROJECT.FETCH_TASK, {
      project_id,
      page_size: 1000,
      page_index: 1,
    })
  }

  public fetchMyTask(req: any) {
    return this.post(ApiConfig.PROJECT.FETCH_USER_TASK, {
      ...req,
      page_size: 100,
      page_index: 1,
    })
  }

  public setRole(req: any) {
    return this.post(req.url, {
      project_id: req.project_id,
      user_id: req.user_id,
    })
  }
}

export default new ProjectService()
