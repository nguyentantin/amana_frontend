import _ from 'lodash'
import React from 'react'
import { Modal, Select, Form, Col } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router'

import projectReducer from '../../../store/modules/project/reducers'
import projectSaga from '../../../store/modules/project/sagas'
import roleReducer from '../../../store/modules/role/reducers'
import roleSaga from '../../../store/modules/role/sagas'
import store from '../store'
import { fetchExternalMembers, requestAssignMembers } from '../../../store/modules/project/actions'
import { fetchRoles } from '../../../store/modules/role/actions'
import { getExternalMembers } from '../../../store/modules/project/selectors'
import { getRoles } from '../../../store/modules/role/selectors'
import { injectReducer, injectSaga } from '../../../store'

@observer
class AssignMemberModal extends React.Component {
  constructor(props) {
    super(props);
    this.onOk = this.onOk.bind(this)
  }
  handleSelectMember(memberId) {
    store.setMember('memberId', memberId)
  }

  handleSelectRole(roleId) {
    store.setMember('roleId', roleId)
  }

  onCancel() {
    store.resetMember()
    store.toggleActiveAssignMemberModal()
  }

  onOk() {
    this.props.requestAssignMembers({
      id: this.props.match.params.projectId,
      members: [{...store.member}]
    })
    store.resetMember()
    store.toggleActiveAssignMemberModal()
  }

  getMemberOptions(members) {
    if (_.isEmpty(members)) {
      return []
    }

    const { Option } = Select

    return members.map((member) => (
      <Option
        value={member.id}
        key={`member-key-${member.id}`}
      >{member.name}
      </Option>
    ))
  }

  getRoleOptions(roles) {
    if (_.isEmpty(roles)) {
      return []
    }

    const { Option } = Select

    return roles.map((role) => (
      <Option
        value={role.id}
        key={`role-key-${role.id}`}
      >{role.name}
      </Option>
    ))
  }

  componentDidMount() {
    const {match: {params}} = this.props
    this.props.fetchRoles()
    this.props.fetchExternalMembers({id: Number(params.projectId)})
  }

  render() {
    const memberOptions = this.getMemberOptions(this.props.externalMembers)
    const roleOptions = this.getRoleOptions(this.props.roles)

    return (
      <Modal
        visible={store.activeAssignMemberModal}
        maskClosable={false}
        width={600}
        closable={false}
        onCancel={this.onCancel}
        onOk={this.onOk}
        okButtonProps={{
          disabled: !store.validateMember
        }}
      >
        <div style={{marginBottom: 30}}>
          <Form
            labelCol={{span: 6}}
            wrapperCol={{span: 15}}
          >
            <Col span={12}>
              <Form.Item
                label={'Member'}
                name={'member'}
              >
                <Select
                  style={{width: 200}}
                  key={'memberId'}
                  showSearch
                  value={store.member.memberId}
                  filterOption={(input, option) => {
                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }}
                  onChange={this.handleSelectMember}
                >{memberOptions}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={'role'}
                name={'role'}
              >
                <Select
                  style={{width: 200}}
                  key={'roleId'}
                  value={store.member.roleId}
                  onChange={this.handleSelectRole}
                >{roleOptions}
                </Select>
              </Form.Item>
            </Col>
          </Form>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  externalMembers: getExternalMembers(state),
  roles: getRoles(state),
})

const mapDispatchToProps = {
  fetchExternalMembers,
  fetchRoles,
  requestAssignMembers,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'project', reducer: projectReducer}),
  injectReducer({key: 'role', reducer: roleReducer}),
  injectSaga({key: 'project', saga: projectSaga}),
  injectSaga({key: 'role', saga: roleSaga}),
  withRouter
)(AssignMemberModal)
