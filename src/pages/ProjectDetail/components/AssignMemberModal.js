import React from 'react'
import _ from 'lodash'
import { Modal, Select, Form, Col } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'redux'
import projectReducer from '../../../store/modules/project/reducers'
import projectSaga from '../../../store/modules/project/sagas'
import roleReducer from '../../../store/modules/role/reducers'
import roleSaga from '../../../store/modules/role/sagas'
import { fetchExternalMembers } from '../../../store/modules/project/actions'
import { fetchRoles } from '../../../store/modules/role/actions'
import { getExternalMembers } from '../../../store/modules/project/selectors'
import { getRoles } from '../../../store/modules/role/selectors'
import { injectReducer, injectSaga } from '../../../store'
import { withRouter } from 'react-router'
import { computed } from 'mobx'

class AssignMemberModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memberId: null,
      roleId: null
    }
    this.handleSelectMember = this.handleSelectMember.bind(this)
    this.handleSelectRole = this.handleSelectRole.bind(this)
  }

  handleSelectMember(memberId) {
    this.setState({
      memberId: memberId
    })
  }

  handleSelectRole(roleId) {
    this.setState({
      roleId: roleId
    })
  }

  @computed get
  listOptions() {
    if (_.isEmpty(this.props.externalMembers)) {
      return []
    }

    const { Option } = Select

    return this.props.externalMembers.map((member) => (
      <Option
        value={member.id}
        key={`member-key-${member.id}`}
      >{member.name}
      </Option>
    ))
  }

  @computed get
  listRoles() {
    if (_.isEmpty(this.props.roles)) {
      return []
    }

    const { Option } = Select

    return this.props.roles.map((role) => (
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
    return (
      <Modal
        visible={this.props.visible}
        maskClosable={false}
        width={600}
        closable={false}
        onCancel={this.props.onCancel}
        onOk={this.props.onOk}
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
                  key={'select member'}
                  label={'select member label'}
                  showSearch
                  filterOption={(input, option) => {
                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }}
                  onChange={this.handleSelectMember}
                >{this.listOptions}
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
                  key={'select role'}
                  label={'select role'}
                  onChange={this.handleSelectRole}
                >{this.listRoles}
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
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'project', reducer: projectReducer}),
  injectReducer({key: 'role', reducer: roleReducer}),
  injectSaga({key: 'project', saga: projectSaga}),
  injectSaga({key: 'role', saga: roleSaga}),
  withRouter
)(AssignMemberModal)
