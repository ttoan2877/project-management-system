import ApiConfig from 'config/api-config'
import BaseService from './BaseService'
import {
  TaskRequest,
  UserTaskRequest,
  AssignRequest,
  SubtaskRequest,
} from 'models/api/task'

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

  public createSubtask(req: SubtaskRequest) {
    return this.post(ApiConfig.SUBTASK.CREATE, req)
  }

  public updateSubtask(req: SubtaskRequest) {
    return this.post(ApiConfig.SUBTASK.UPDATE, req)
  }

  public fetchUserTask(req: UserTaskRequest) {
    return this.post(ApiConfig.TASK.FETCH_USER, req)
  }
}

export default new TaskService()
