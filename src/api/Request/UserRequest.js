import HttpRequest from '../HttpRequest'

class UserRequest extends HttpRequest {
  search(params = {}) {
    return this.get('/users', params)
  }

  profile() {
    return this.get('/users/me')
  }

  updateProfile(data) {
    return this.put('/users/me', data)
  }
}

export default new UserRequest()
