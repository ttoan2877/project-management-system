import ApiConfig from 'config/api-config'
import BaseService from './BaseService'
import { LoginRequest } from 'models/api/login'

class AuthService extends BaseService {
  public login(req: LoginRequest) {
    return this.post(ApiConfig.AUTH, req)
  }
}

export default new AuthService()
