import { action, computed, observable } from 'mobx'

class Store {
  @observable activeRoleManagerModal = false
  @observable activeAssignMemberModal = false
  @observable member = {
    memberId: null,
    roleId: null
  }

  @computed get
  validateMember() {
    return !!(this.member.memberId && this.member.roleId)
  }

  @action
  toggleActiveRoleManagerModal() {
    this.activeRoleManagerModal = !this.activeRoleManagerModal
  }

  @action
  toggleActiveAssignMemberModal() {
    this.activeAssignMemberModal = !this.activeAssignMemberModal
  }

  @action
  setMember(key, value) {
    const keys = ['memberId', 'roleId']

    if (keys.indexOf(key) > -1) {
      this.member[key] = value
    }
  }
}

export default new Store()
