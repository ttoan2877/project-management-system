import ApiConfig from 'config/api-config'
import BaseService from './BaseService'
import { TaskRequest, AssignRequest, Status } from 'models/api/task'
import { getStatusRoute } from 'utils/status'

class TaskService extends BaseService {
  public createTask(req: TaskRequest) {
    return this.post(ApiConfig.TASK.CREATE, req)
  }

  public updateTask(req: TaskRequest) {
    return this.post(ApiConfig.TASK.UPDATE, req)
  }

  public fetchTask(req: number) {
    return this.post(ApiConfig.TASK.BY_ID, { task_id: req })
  }

  public assignUser(req: AssignRequest) {
    return this.post(ApiConfig.TASK.ASSIGN, req)
  }

  public unassignUser(req: AssignRequest) {
    return this.post(ApiConfig.TASK.UNASSIGN, req)
  }

  public fetchUserTask(req: number) {
    return this.post(ApiConfig.TASK.FETCH_USER, {
      task_id: req,
      page_index: 1,
      page_size: 1000,
    })
  }

  public changeStatus(task_id: number, status: Status) {
    const url = getStatusRoute(status)
    return this.post(url, {
      task_id,
    })
  }
}

export default new TaskService()
