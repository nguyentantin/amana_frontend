import _ from 'lodash'
import React from 'react'
import { Button, Col, Form, Input, Select } from 'antd'
import { Field, reduxForm } from 'redux-form'
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
import { required } from '../../../utils/validations'
import { ASelect } from '../../../components/FormUI'

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

  onSubmit(member) {
    const { match, store, requestAssignMembers } = this.props

    requestAssignMembers({
      id: match.params.projectId,
      members: [{...member}]
    })

    store.toggleActiveAssignMemberModal()
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
    const { handleSubmit } = this.props
    const memberOptions = this.renderMemberOptions(this.props.externalMembers)
    const roleOptions = this.renderRoleOptions(this.props.roles)

    return (
      <div style={{height: 25}}>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Form.Item>
            <Input.Group compact>
              <Col span={12} style={{paddingRight: 0}}>
                <Form.Item style={{marginBottom: 0}}>
                  <Field
                    name={'memberId'}
                    component={ASelect}
                    placeholder={'Search by name or email address'}
                    showSearch
                    style={{width: '100%'}}
                    filterOption={(input, option) => {
                      return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        || option.props.email.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }}
                    validate={[required]}
                  >{memberOptions}
                  </Field>
                </Form.Item>
              </Col>

              <Col span={8} style={{paddingRight: 0}}>
                <Form.Item style={{marginBottom: 0}}>
                  <Field
                    name={'roleId'}
                    component={ASelect}
                    style={{width: '100%'}}
                    validate={[required]}
                  >{roleOptions}
                  </Field>
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item>
                  <Button
                    className='btn-right'
                    style={{width: '100%'}}
                    type='primary'
                    htmlType="submit"
                  >Add
                  </Button>
                </Form.Item>
              </Col>
            </Input.Group>
          </Form.Item>
        </Form>
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
  withRouter,
  reduxForm({
    form: 'AssignMemberForm'
  })
)(AssignMember)
