import HttpRequest from '../HttpRequest'

class UserRequest extends HttpRequest {
  search(params = {}) {
    return this.get('/users', params)
  }
}

export default new UserRequest()
