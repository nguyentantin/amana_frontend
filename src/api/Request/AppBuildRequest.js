import HttpRequest from '../HttpRequest'

class AppBuildRequest extends HttpRequest {
  all(params = {}) {
    return this.get('/app-builds', params)
  }

  fetchByProjectId(projectId, params = {}) {
    return this.get(`/app-builds/projects/${projectId}`, params)
  }

  downloadHistories(buildId, params = {}) {
    return this.get(`/app-builds/${buildId}/download-histories`, params)
  }
}

export default new AppBuildRequest()
