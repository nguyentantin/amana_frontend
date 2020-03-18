import React from 'react'
import { Button, Icon, Modal } from 'antd'
import AssignMemberModal from './AssignMemberModal'
import { action, observable } from 'mobx'

export class RoleManagerModal extends React.Component {
  @observable activeAssignMemberModal = false

  constructor(props) {
    super(props);
    this.toggleAssignMemberModal = this.toggleAssignMemberModal.bind(this)
  }

  @action
  toggleAssignMemberModal() {
    this.activeAssignMemberModal = !this.activeAssignMemberModal
    console.log(this.activeAssignMemberModal)
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.props.onOk}
        closable={false}
      >
        <Button className="btn-right" type="primary" size='large' onClick={this.toggleAssignMemberModal}>
          <Icon type="user-add"/>
          Assign Member
        </Button>
        <AssignMemberModal
          visible={this.activeAssignMemberModal}
          onCancel={this.toggleAssignMemberModal}
          onOk={this.toggleAssignMemberModal}
        />
      </Modal>
    )
  }
}
