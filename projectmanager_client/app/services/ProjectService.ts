import ApiConfig from 'config/api-config'
import BaseService from './BaseService'
import { ProjectRequest } from 'models/api/project'

class ProjectService extends BaseService {
  public createProject(req: ProjectRequest) {
    return this.post(ApiConfig.PROJECT.CREATE, req)
  }

  public updateProject(req: ProjectRequest) {
    return this.post(ApiConfig.PROJECT.UPDATE, req)
  }

  public fetchProject(req: number) {
    return this.post(ApiConfig.PROJECT.FETCH, { project_id: req })
  }
}

export default new ProjectService()
