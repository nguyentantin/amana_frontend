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

import { Flex } from '../../styles/utility'
import { StyleAvatar, StyleCard, StyleContainer, StyleHeader } from './styled'
import ModalCreateProject from './ModalCreateProject'
import ProjectRequest from '../../api/Request/ProjectRequest'
import { HTTP_CODE } from '../../config/constants'
import { PlatformIcon } from '../../components/CoreUI'
import TableStyle from '../../styles/tableResponsive'
import { ShowIf } from '../../components/Utils'
import LocalStorage from '../../utils/localStorage'

const {Search} = Input

@observer
class ProjectListPage extends React.Component {
  @observable projects = []
  @observable loading = false
  @observable modalCreateVisible = false

  @action fetchProjects() {
    this.loading = true

    ProjectRequest
      .all()
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

  @action toggleModalCreate() {
    this.modalCreateVisible = !this.modalCreateVisible
  }

  isSuperAdmin() {
    const me = LocalStorage.getAuthInfo()
    return _.get(me, 'isSuperAdmin', false)
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
                  shape="square"
                  size="large"
                  name={text}
                  style={{backgroundColor: record.color}}
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
        key: 'author',
        render: text => (
          <span>
        <div>Author</div>
            {text}
      </span>
        ),
      },
      {
        dataIndex: 'platformType',
        key: 'platformType',
        render: text => (
          <span>
        <div>Platform</div>
            <PlatformIcon platform={text}/>
      </span>
        ),
      },
      {
        dataIndex: 'description',
        key: 'description',
        width: 200,
        render: text => (
          <span>
        <div>Description</div>
            {text}
      </span>
        ),
      }
    ]
  }

  render() {
    return (
      <StyleContainer>
        <StyleCard>
          <StyleHeader>
            <h2>Projects</h2>
            <div>
              <Search
                placeholder="Search project name"
                style={{width: 200, marginLeft: '10px'}}
              />
            </div>
          </StyleHeader>

          <ShowIf condition={this.isSuperAdmin()}>
            <Button
              type="dashed"
              block
              onClick={() => this.toggleModalCreate()}
            >
              <PlusOutlined />Create Project
            </Button>
          </ShowIf>

          <ModalCreateProject
            visible={this.modalCreateVisible}
            onCreateProject={(values, cb) => this.createProject(values, cb)}
            onToggle={() => this.toggleModalCreate()}
          />

          <TableStyle
            columns={this.columns()}
            dataSource={this.projects}
            loading={this.loading}
            rowKey="id"
          />
        </StyleCard>
      </StyleContainer>
    )
  }
}

export default compose(
  connect()
)(ProjectListPage)
