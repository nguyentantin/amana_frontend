import React from 'react'
import { Modal } from 'antd'
import { inject, observer } from 'mobx-react'
import AssignMember from './AssignMember'

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
        title={<AssignMember/>}
        visible={this.props.store.activeRoleManagerModal}
        onCancel={this.onCancel}
        onOk={this.onOk}
        closable={false}
        maskClosable={false}
      >
        <div>{/* list members */}</div>
      </Modal>
    )
  }
}

export default RoleManagerModal
