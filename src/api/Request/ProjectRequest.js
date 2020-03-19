import HttpRequest from '../HttpRequest'

class ProjectRequest extends HttpRequest {
  all(params = {}) {
    return this.get('/ProjectList', params)
  }

  detail(projectId) {
    return this.get(`/projects/${projectId}`)
  }

  create(params) {
    return this.post('/projects', params)
  }

  get(params) {
    return this.get('/projects', params)
  }
}

export default new ProjectRequest()
