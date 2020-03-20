import React from 'react'
import { Button, Icon, Modal } from 'antd'
import AssignMemberModal from './AssignMemberModal'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class RoleManagerModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleActiveAssignModal = this.handleActiveAssignModal.bind(this)
    this.onOk = this.onOk.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }
  handleActiveAssignModal() {
    this.props.store.toggleActiveAssignMemberModal()
  }

  onCancel() {
    this.props.store.toggleActiveRoleManagerModal()
  }

  onOk() {
    this.props.store.toggleActiveRoleManagerModal()
  }

  render() {
    return (
      <Modal
        visible={this.props.store.activeRoleManagerModal}
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
