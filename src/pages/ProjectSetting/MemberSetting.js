import React from 'react'
import { Button, Form, List, Avatar, Tag, Select, Skeleton, Popconfirm } from 'antd'
import { withRouter } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import { observer } from 'mobx-react'
import { observable, action, toJS } from 'mobx'
import { UserOutlined, CloseCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux'
import _ from 'lodash'

import { Box } from '../../styles/utility'
import { ASelect } from '../../components/FormUI'
import ProjectRequest from '../../api/Request/ProjectRequest'
import UserRequest from '../../api/Request/UserRequest'
import { ROLES } from '../../config/constants'
import { StyleSelect, StyleList } from './styled'

const { Option } = Select
const { CheckableTag } = Tag

@observer
class MemberSetting extends React.PureComponent {
  @observable loading = false
  @observable loadingMembers = false
  @observable search = []
  @observable members = []
  @observable membersSelected = []

  @observable loadingButtonAssign = false

  @action onChangeSelect(members) {
    this.membersSelected = [...members]
  }

  @action fetchMembers() {
    const {match: {params}} = this.props
    this.loadingMembers = true
    ProjectRequest
      .listMembers(params.projectId)
      .then((data) => {
        this.members = data.data
      })
      .finally(() => {
        this.loadingMembers = false
      })
  }

  @action assignMembers(data) {
    const {match: {params}} = this.props
    this.loadingButtonAssign = true

    ProjectRequest
      .assignMembers(params.projectId, data)
      .then((data) => {
        this.membersSelected = []
      })
      .finally(() => {
        this.loadingButtonAssign = false
        this.fetchMembers()
      })
  }

  @action searchMember(params) {
    UserRequest
      .search(params)
      .then((data) => {
        this.search = data
      })
  }

  @action deleteMember(memberId) {
    const {match: {params}} = this.props

    ProjectRequest
      .deleteMember(params.projectId, memberId)
      .finally(() => {
        this.fetchMembers()
      })
  }

  @action updateMemberRole(data) {
    const {match: {params}} = this.props

    ProjectRequest
      .updateMemberRole(params.projectId, data)
      .finally(() => {
        this.fetchMembers()
      })
  }

  constructor(props) {
    super(props)

    this.onSearch = this.onSearch.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.addMembers = this.addMembers.bind(this)
    this.deleteMember = this.deleteMember.bind(this)
    this.updateMemberRole = this.updateMemberRole.bind(this)
  }

  componentDidMount() {
    this.fetchMembers()
  }

  addMembers(values) {
    if (!_.isEmpty(values.role) && !_.isEmpty(this.membersSelected)) {
      const members = _.map(this.membersSelected, (id) => {
        return {
          memberId: _.parseInt(id),
          roleId: _.parseInt(values.role)
        }
      })

      this.assignMembers({members: members})
    }
  }

  onSearch(value) {
    if (!_.isEmpty(value)) {
      const params = {
        search: value
      }
      clearTimeout(this.typingTimeout)
      this.typingTimeout = setTimeout(() => {
        this.searchMember(params)
      }, 470)
    }
  }

  renderOptions() {
    return _.map(this.search, (member) => {
      return (
        <Option key={member.id} value={String(member.id)}>
          <Avatar size={15} icon={<UserOutlined/>}/>

          <span style={{marginLeft: '5px'}}>{member.name}</span>
        </Option>
      )
    })
  }

  renderMemberRole(member) {
    const data = toJS(member)
    const isAdminRoles = _.get(data, 'role.id') === ROLES.PROJECT_ADMIN
    const isMemberRoles = _.get(data, 'role.id') === ROLES.PROJECT_MEMBER

    return (
      <React.Fragment>
        <CheckableTag checked={isAdminRoles} onChange={() => this.updateMemberRole({
          memberId: member.id,
          roleId: ROLES.PROJECT_ADMIN
        })}>Administrator</CheckableTag>

        <CheckableTag checked={isMemberRoles} onChange={() => this.updateMemberRole({
          memberId: member.id,
          roleId: ROLES.PROJECT_MEMBER
        })}>Member</CheckableTag>
      </React.Fragment>
    )
  }

  renderMember(member) {
    return (
      <StyleList key={member.id} >
        <List.Item.Meta
          avatar={
            <Avatar icon={<UserOutlined/>}/>
          }
          title={member.name}
          description={member.email}
        />
        <Box>
          {this.renderMemberRole(member)}

          <Popconfirm
            placement="topRight"
            title='Are you sure to delete this member?'
            okText="Yes"
            cancelText="No"
            onConfirm={() => this.deleteMember(member.id)}
          >
            <CloseCircleFilled style={{fontSize: 16}}/>
          </Popconfirm>
        </Box>
      </StyleList>
    )
  }

  render() {
    const {handleSubmit} = this.props
    const optionSearch = this.renderOptions()

    return (
      <Box p={[0, 15]}>
        <h2> Members </h2>

        <Form layout="inline" onSubmit={handleSubmit(this.addMembers)}>
          <Box mb={2} textAlign={['left', 'center']}>
            <StyleSelect
              mode='multiple'
              placeholder='Add a member bu their name or email address'
              onSearch={this.onSearch}
              filterOption={false}
              onChange={this.onChangeSelect}
              value={this.membersSelected}
            >
              {optionSearch}
            </StyleSelect>

            <Field
              name='role'
              style={{width: '222px'}}
              component={ASelect}
            >
              <Option value={String(ROLES.PROJECT_MEMBER)}>Member</Option>
              <Option value={String(ROLES.PROJECT_ADMIN)}>Administrator</Option>
            </Field>

            <Button htmlType='submit' style={{marginTop: '3px'}} type="primary" loading={this.loadingButtonAssign}>
              Add
            </Button>
          </Box>

          <Skeleton active avatar loading={this.loadingMembers} rows={5}>
            <List
              dataSource={this.members}
              renderItem={member => this.renderMember(member)}
            />
          </Skeleton>
        </Form>
      </Box>
    )
  }
}

const mapStateToProps = () => {
  return {
    initialValues: {
      role: String(ROLES.PROJECT_MEMBER)
    },
  }
}

const enhancer = compose(
  connect(mapStateToProps, {}),
  withRouter,
  reduxForm({
    form: 'MemberSettingForm'
  })
)

export default enhancer(MemberSetting)
