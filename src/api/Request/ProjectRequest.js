import HttpRequest from '../HttpRequest'

class ProjectRequest extends HttpRequest {
  all(params = {}) {
    return this.get('/projects', params)
  }

  detail(projectId) {
    return this.get(`/projects/${projectId}`)
  }

  appBuildDetail(projectId, appBuildId) {
    return this.get(`/projects/${projectId}/app-builds/${appBuildId}`)
  }
}

export default new ProjectRequest()
