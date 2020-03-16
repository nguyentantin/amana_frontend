import HttpRequest from '../HttpRequest'

class ProjectRequest extends HttpRequest {
  all(params = {}) {
    return this.get('/projects', params)
  }

  detail(projectId) {
    return this.get(`/projects/${projectId}`)
  }

  fetchExternalMembers(projectId) {
    return this.get(`/project/${projectId}/external-members`)
  }

  assignMembers(projectId, data) {
    return this.post(`/project/${projectId}/members`, data)
  }
}

export default new ProjectRequest()
