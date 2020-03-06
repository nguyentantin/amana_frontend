import HttpRequest from '../HttpRequest'

class ProjectRequest extends HttpRequest {
  all(params = {}) {
    return this.get('/projects', params)
  }
}

export default new ProjectRequest()
