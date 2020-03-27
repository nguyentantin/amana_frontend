import HttpRequest from '../HttpRequest'

class AppBuildRequest extends HttpRequest {
  all(params = {}) {
    return this.get('/app-builds', params)
  }

  fetchByProjectId(projectId, params = {}) {
    return this.get(`/app-builds/${projectId}`, params)
  }

  downloadHistories(buildId) {
    return this.get(`/app-builds/${buildId}/download-histories`)
  }
}

export default new AppBuildRequest()
