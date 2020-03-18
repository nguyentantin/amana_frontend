import React from 'react'
import { Modal, Select, Form, Col } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'redux'
import projectReducer from '../../../store/modules/project/reducers'
import projectSaga from '../../../store/modules/project/sagas'
import roleReducer from '../../../store/modules/role/reducers'
import roleSaga from '../../../store/modules/role/sagas'
import { fetchExternalMembers } from '../../../store/modules/project/actions'
import { fetchRoles } from '../../../store/modules/role/actions'
import { getListMemberOptions } from '../../../store/modules/project/selectors'
import { getRoleOptions } from '../../../store/modules/role/selectors'
import { injectReducer, injectSaga } from '../../../store'
import { withRouter } from 'react-router'
import store from '../store'
import { observer } from 'mobx-react'

@observer
class AssignMemberModal extends React.Component {
  handleSelectMember(memberId) {
    store.setMember('memberId', memberId)
  }

  handleSelectRole(roleId) {
    store.setMember('roleId', roleId)
  }

  componentDidMount() {
    const {match: {params}} = this.props
    this.props.fetchRoles()
    this.props.fetchExternalMembers({id: Number(params.projectId)})
  }

  onCancel() {
    store.toggleActiveAssignMemberModal()
  }

  onOk() {
    store.toggleActiveAssignMemberModal()
  }

  render() {
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
                  filterOption={(input, option) => {
                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }}
                  onChange={this.handleSelectMember}
                >{this.props.listMemberOptions}
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
                  onChange={this.handleSelectRole}
                >{this.props.listRoleOptions}
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
  listMemberOptions: getListMemberOptions(state),
  listRoleOptions: getRoleOptions(state),
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
