import HttpRequest from '../HttpRequest'

class AppBuildRequest extends HttpRequest {
  all(params = {}) {
    return this.get('/app-builds', params)
  }

  fetchByProjectId(projectId, params = {}) {
    return this.get(`/app-builds/${projectId}`, params)
  }
}

export default new AppBuildRequest()
