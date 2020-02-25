import HttpRequest from '../HttpRequest'

import { LOGIN_CREDENTIALS } from '../../config/constants'

class AuthRequest extends HttpRequest {
  login(credentials) {
    return this.post('/auth/token', {...credentials, ...LOGIN_CREDENTIALS})
  }

  logout() {
    return this.get('/auth/logout')
  }
}

export default new AuthRequest()
