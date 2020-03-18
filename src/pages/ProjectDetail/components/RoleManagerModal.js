import React from 'react'
import { Button, Icon, Modal } from 'antd'
import AssignMemberModal from './AssignMemberModal'
import store from '../store'
import { observer } from 'mobx-react'

@observer
class RoleManagerModal extends React.Component {
  handleActiveAssignModal() {
    store.toggleActiveAssignMemberModal()
  }

  onCancel() {
    store.toggleActiveRoleManagerModal()
  }

  onOk() {
    store.toggleActiveRoleManagerModal()
  }

  render() {
    return (
      <Modal
        visible={store.activeRoleManagerModal}
        onCancel={this.onCancel}
        onOk={this.onOk}
        closable={false}
      >
        <Button className="btn-right" type="primary" size='large' onClick={this.handleActiveAssignModal}>
          <Icon type="user-add"/>
          Members
        </Button>
        <AssignMemberModal/>
      </Modal>
    )
  }
}

export default RoleManagerModal
