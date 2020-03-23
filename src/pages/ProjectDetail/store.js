import { action, observable } from 'mobx'

class Store {
  @observable activeRoleManagerModal = false

  @action
  toggleActiveRoleManagerModal() {
    this.activeRoleManagerModal = !this.activeRoleManagerModal
  }
}

export default new Store()
