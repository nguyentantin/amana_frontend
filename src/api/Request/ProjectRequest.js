import HttpRequest from '../HttpRequest'

class ProjectRequest extends HttpRequest {
  all(params = {}) {
    return this.get('/projects', params)
  }

  detail(projectId) {
    return this.get(`/projects/${projectId}`)
  }

  fetchExternalMembers(projectId) {
    this.setHeaderToken()

    return this.get(`/projects/${projectId}/external-members`)
  }

  assignMembers(projectId, data) {
    this.setHeaderToken()

    return this.post(`/projects/${projectId}/members`, data)
  }
}

export default new ProjectRequest()
