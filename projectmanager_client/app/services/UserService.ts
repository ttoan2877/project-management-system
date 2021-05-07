import ApiConfig from 'config/api-config'
import BaseService from './BaseService'
import { UserRequest } from 'models/api/user'

class TaskService extends BaseService {
  public updateUser(req: UserRequest) {
    return this.post(ApiConfig.USER.UPDATE, req)
  }

  public fetchUser(req: number) {
    return this.post(ApiConfig.USER.BY_ID, { user_id: req })
  }

  public fetchUserProject() {
    return this.post(ApiConfig.USER.FETCH_PROJECT, {
      status: 1,
      page_size: 100,
      page_index: 1,
    })
  }

  public fetchAllUser() {
    return this.post(ApiConfig.USER.FETCH_ALL_USER, {
      page_size: 100,
      page_index: 1,
    })
  }
}

export default new TaskService()
