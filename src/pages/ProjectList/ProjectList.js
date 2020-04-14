import React from 'react'
import { Button, Input, message } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'
import { reset, stopSubmit } from 'redux-form'
import _ from 'lodash'
import { PlusOutlined } from '@ant-design/icons'
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined'

import { Flex } from '../../styles/utility'
import { Page, StyleAvatar, StyleHeader } from './styled'
import ModalCreateProject from './ModalCreateProject'
import ProjectRequest from '../../api/Request/ProjectRequest'
import { HTTP_CODE, PLATFORM_TYPE } from '../../config/constants'
import { PlatformIcon } from '../../components/CoreUI'
import TableStyle from '../../styles/tableResponsive'
import ModalUpdateProject from './ModalUpdateProject'
import { ShowIf } from '../../components/Utils'

const {Search} = Input

@observer
class ProjectListPage extends React.Component {
  @observable projects = []
  @observable loading = false
  @observable modalCreateVisible = false
  @observable modalUpdateVisible = false
  @observable initialValues
  @observable project

  @action fetchProjects(params = {}) {
    this.loading = true

    ProjectRequest
      .all(params)
      .then((data) => {
        this.projects = data
      })
      .finally(() => {
        this.loading = false
      })
  }

  @action createProject(params, callback) {
    message.loading({content: 'Processing...', key: 'create_project'})
    const {dispatch} = this.props

    ProjectRequest
      .createProject(params)
      .then(() => {
        message.success({content: 'Create project successfully!', key: 'create_project', duration: 2})
        dispatch(reset('CreateProjectForm'))
        this.modalCreateVisible = false
        callback()
        dispatch(reset('CreateProjectForm'))
        this.fetchProjects()
      })
      .catch((error) => {
        if (_.get(error, 'statusCode') === HTTP_CODE.UNPROCESSABLE_ENTITY) {
          dispatch(stopSubmit('CreateProjectForm', error.error))
        } else {
          message.error({content: _.get(error, 'message'), key: 'create_project', duration: 2})
        }
      })
      .finally(() => {
        message.destroy()
      })
  }

  @action async updateProject(projectId, data) {
    message.loading({content: 'Processing...', key: 'update_project'})
    const {dispatch} = this.props

    try {
      await ProjectRequest.updateProject(projectId, data)

      message.success({ content: 'Update project successfully!', key: 'update_project', duration: 2 })
      dispatch(reset('UpdateProjectForm'))

      this.fetchProjects()
    } catch (e) {
      if (_.get(e, 'statusCode') === HTTP_CODE.UNPROCESSABLE_ENTITY) {
        dispatch(stopSubmit('UpdateProjectForm', e.error))
      } else {
        message.error({content: _.get(e, 'message'), key: 'update_project', duration: 2})
      }
    } finally {
      message.destroy()
    }
  }

  @action toggleModalCreate() {
    this.modalCreateVisible = !this.modalCreateVisible
  }

  @action toggleModalUpdate() {
    this.modalUpdateVisible = !this.modalUpdateVisible
  }

  @action setInitialValues(project = {}) {
    this.initialValues = {
      name: _.get(project, 'name', null),
      description: _.get(project, 'description', null),
      platformType: _.get(project, 'platformType', PLATFORM_TYPE.IOS),
      color: _.get(project, 'color', null)
    }

    this.project = project
    this.toggleModalUpdate()
  }

  componentDidMount() {
    this.fetchProjects()
  }

  columns() {
    return [
      {
        name: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return (
            <Link to={`/projects/${record.id}`}>
              <Flex flex='flex'>
                <StyleAvatar
                  mr={2}
                  project={record}
                  shape="square"
                  size="large"
                />
                <div>
                  <div>Name</div>
                  {text}
                </div>
              </Flex>
            </Link>
          )
        },
      },
      {
        dataIndex: 'author.name',
        key: 'author.name',
        render: (text, record) => {
          return (
            <span><div>Author</div>{_.get(record, 'author.name', '')}</span>
          )
        },
      },
      {
        dataIndex: 'platformType',
        key: 'platformType',
        render: text => (
          <span><div>Platform</div><PlatformIcon platform={text}/></span>
        ),
      },
      {
        dataIndex: 'description',
        key: 'description',
        width: 200,
        render: text => (
          <span><div>Description</div>{text}</span>
        ),
      },
      {
        width: 100,
        render: (text, record) => (
          <div>
            <span
              onClick={() => this.setInitialValues(record)}
              style={{color: '#fa8c16', cursor: 'pointer'}}
            ><EditOutlined />
            </span>
          </div>
        )
      }
    ]
  }

  render() {
    return (
      <Page>
        <StyleHeader>
          <h2>Projects</h2>
          <div>
            <Search
              placeholder="Search project name"
              style={{width: 200, paddingLeft: '10px'}}
              onSearch={value => this.fetchProjects({search: value})}
            />
          </div>
        </StyleHeader>

        <Button
          type="dashed"
          block
          onClick={() => this.toggleModalCreate()}
        >
          <PlusOutlined/>Create Project
        </Button>

        <ModalCreateProject
          visible={this.modalCreateVisible}
          onCreateProject={(values, cb) => this.createProject(values, cb)}
          onToggle={() => this.toggleModalCreate()}
        />

        <ShowIf condition={this.modalUpdateVisible}>
          <ModalUpdateProject
            onCloseModal={() => this.setInitialValues()}
            onUpdateProject={(id, data) => this.updateProject(id, data)}
            project={this.project}
            initialValues={this.initialValues}
          />
        </ShowIf>

        <TableStyle
          columns={this.columns()}
          dataSource={this.projects}
          loading={this.loading}
          rowKey="id"
        />
      </Page>
    )
  }
}

export default compose(
  connect()
)(ProjectListPage)
