import HttpRequest from '../HttpRequest'

class ProjectRequest extends HttpRequest {
  all(params = {}) {
    return this.get('/ProjectList', params)
  }

  detail(projectId) {
    return this.get(`/projects/${projectId}`)
  }
}

export default new ProjectRequest()
