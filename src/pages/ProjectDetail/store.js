import { action, observable } from 'mobx'

class Store {
  @observable activeRoleManagerModal = false
  @observable activeAssignMemberModal = false

  @action
  toggleActiveRoleManagerModal() {
    this.activeRoleManagerModal = !this.activeRoleManagerModal
  }

  @action
  toggleActiveAssignMemberModal() {
    this.activeAssignMemberModal = !this.activeAssignMemberModal
  }
}

export default new Store()
