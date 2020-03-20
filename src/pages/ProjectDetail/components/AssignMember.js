import _ from 'lodash'
import React from 'react'
import { Button, Col, Form, Input, Select } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'

import projectReducer from '../../../store/modules/project/reducers'
import projectSaga from '../../../store/modules/project/sagas'
import roleReducer from '../../../store/modules/role/reducers'
import roleSaga from '../../../store/modules/role/sagas'
import { fetchExternalMembers, requestAssignMembers } from '../../../store/modules/project/actions'
import { fetchRoles } from '../../../store/modules/role/actions'
import { getExternalMembers } from '../../../store/modules/project/selectors'
import { getRoles } from '../../../store/modules/role/selectors'
import { injectReducer, injectSaga } from '../../../store'

@inject('store')
@observer
class AssignMember extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectMember = this.handleSelectMember.bind(this)
    this.handleSelectRole = this.handleSelectRole.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleSelectMember(memberId) {
    this.props.store.setMember('memberId', memberId)
  }

  handleSelectRole(roleId) {
    this.props.store.setMember('roleId', roleId)
  }

  onSubmit() {
    this.props.requestAssignMembers({
      id: this.props.match.params.projectId,
      members: [{...this.props.store.member}]
    })
    this.props.store.resetMember()
    this.props.store.toggleActiveAssignMemberModal()
  }

  renderMemberOptions(members) {
    if (_.isEmpty(members)) {
      return []
    }

    const { Option } = Select

    return members.map((member) => (
      <Option
        value={member.id}
        key={`member-key-${member.id}`}
        email={member.email}
      >{member.name}
      </Option>
    ))
  }

  renderRoleOptions(roles) {
    if (_.isEmpty(roles)) {
      return []
    }

    const { Option } = Select

    return roles.map((role) => (
      <Option
        value={role.id}
        key={`role-key-${role.id}`}
      >{role.description}
      </Option>
    ))
  }

  componentDidMount() {
    const {match: {params}} = this.props
    this.props.fetchRoles()
    this.props.fetchExternalMembers({id: Number(params.projectId)})
  }

  render() {
    const memberOptions = this.renderMemberOptions(this.props.externalMembers)
    const roleOptions = this.renderRoleOptions(this.props.roles)

    return (
      <div style={{height: 25}}>
        <Form.Item>
          <Input.Group compact>
            <Col span={12} style={{paddingRight: 0}}>
              <Form.Item
                name={'member'}
                style={{marginBottom: 0}}
              >
                <Select
                  showSearch
                  placeholder='By name or email address'
                  style={{width: '100%'}}
                  key={'memberId'}
                  value={this.props.store.member.memberId}
                  filterOption={(input, option) => {
                    console.log(option)
                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      || option.props.email.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }}
                  onChange={this.handleSelectMember}
                >{memberOptions}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8} style={{paddingRight: 0}}>
              <Form.Item
                name={'role'}
                style={{marginBottom: 0}}
              >
                <Select
                  style={{width: '100%'}}
                  key={'roleId'}
                  value={this.props.store.member.roleId}
                  onChange={this.handleSelectRole}
                >{roleOptions}
                </Select>
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item>
                <Button
                  onClick={this.onSubmit}
                  disabled={this.props.store.activeAssignMemberModal}
                  className='btn-right'
                  style={{width: '100%'}}
                  type='primary'
                >Add
                </Button>
              </Form.Item>
            </Col>
          </Input.Group>
        </Form.Item>
      </div>
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
)(AssignMember)
