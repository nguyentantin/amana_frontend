import _ from 'lodash'
import { action, computed, get, observable, toJS } from 'mobx'
import { message } from 'antd'

import AppBuildRequest from '../../api/Request/AppBuildRequest'
import LocalStorage from '../../utils/localStorage'
import ProjectRequest from '../../api/Request/ProjectRequest'
import { API_URL, PLATFORM_TYPE } from '../../config/constants'

class MobStore {
  @observable getProjectLoading = false
  @observable getMoreAppBuildsLoading = false
  @observable project = {
    isProjectManager: false
  }
  @observable appBuilds = []
  @observable appBuildsPagination = {}
  @observable currentVersion = {}

  @computed get isAndroid() {
    return get(this.project, 'platformType') === PLATFORM_TYPE.ANDROID
  }

  @computed get downloadUrl() {
    const project = toJS(this.project)
    return `${API_URL}/app-builds/${_.get(project, 'currentVersion.id')}/download.app?token=${LocalStorage.getAccessToken()}`
  }

  @computed get hasMoreAppBuilds() {
    const { current, lastPage } = this.appBuildsPagination

    return !_.isEmpty(this.appBuilds) && current !== lastPage
  }

  @action async getProject(projectId) {

    this.getProjectLoading = false
    try {
      this.getProjectLoading = true
      const { data } = await ProjectRequest.detail(projectId)
      this.project = data.project
      this.currentVersion = data.currentVersion
      this.appBuilds = data.appBuilds.data
      this.setPagination(data.appBuilds.meta)
    } catch (e) {
      message.error('Gets project fail!')
    } finally {
      this.getProjectLoading = false
      message.destroy()
    }
  }

  @action async getMoreAppBuilds() {
    try {
      this.getMoreAppBuildsLoading = true
      const { data } = await AppBuildRequest.fetchByProjectId(this.project.id, { page: this.appBuildsPagination.current + 1})
      this.appBuilds = _.concat(this.appBuilds, data.data)
      this.setPagination(data.meta)
    } catch (e) {
      message.error('Gets more app builds fail!')
    } finally {
      this.getMoreAppBuildsLoading = false
      message.destroy()
    }
  }

  @action setPagination(pagination) {
    const { currentPage, perPage, total, lastPage } = pagination
    this.appBuildsPagination = {
      current: currentPage,
      pageSize: perPage,
      total,
      lastPage,
    }
  }
}

export default new MobStore()
