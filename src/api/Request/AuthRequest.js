import HttpRequest from '../HttpRequest'

class AuthRequest extends HttpRequest {
  login(credentials) {
    return this.post('/auth/login', credentials)
  }

  register(user) {
    return this.post('/auth/register', user)
  }

  logout() {
    return this.get('/auth/logout')
  }

  verifyEmail(params) {
    return this.get('/auth/active-user', params)
  }

  sendMailVerify(params) {
    return this.post('/mails/verify', params)
  }
}

export default new AuthRequest()
