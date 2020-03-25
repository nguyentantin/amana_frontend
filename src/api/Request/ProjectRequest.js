import HttpRequest from '../HttpRequest'

class ProjectRequest extends HttpRequest {
  all(params = {}) {
    return this.get('/projects', params)
  }

  detail(projectId) {
    return this.get(`/projects/${projectId}`)
  }

  createProject(params) {
    return this.post('/projects', params)
  }

  listProject() {
    return this.get('/projects')
  }

  appBuildDetail(projectId, appBuildId) {
    return this.get(`/projects/${projectId}/app-builds/${appBuildId}`)
  }

  fetchExternalMembers(projectId) {
    return this.get(`/projects/${projectId}/external-members`)
  }

  listMembers(id) {
    return this.get(`/projects/${id}/internal-members`)
  }

  assignMembers(projectId, data) {
    return this.post(`/projects/${projectId}/members`, data)
  }

  deleteMember(projectId, memberId) {
    return this.delete(`/projects/${projectId}/member/${memberId}`)
  }

  updateMemberRole(projectId, data) {
    return this.put(`/projects/${projectId}/member`, data)
  }

  buildConfigs(projectId) {
    return this.get(`/projects/${projectId}/build-config`)
  }

  createBuildConfig(projectId, data) {
    return this.post(`/projects/${projectId}/build-config`, data)
  }
}

export default new ProjectRequest()
