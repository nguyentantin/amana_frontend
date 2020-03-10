import { observable } from 'mobx'

import ProjectRequest from '../../api/Request/ProjectRequest'

class Store {
  @observable projectDetail = {}
  @observable loading = false

  @action
  getProject(projectId) {
    ProjectRequest.detail(projectId)
      .then((data) => {
      })
  }
}
