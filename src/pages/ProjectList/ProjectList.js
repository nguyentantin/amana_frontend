import React from 'react'
import { Table, Icon, Input, Button } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import injectReducer from '../../store/injectReducer'
import injectSaga from '../../store/injectSaga'
import reducer from './store/reducers'
import saga from './store/sagas'
import { fetchProject } from './store/actions'
import { Flex } from '../../styles/utility'
import { StyleAvatar, StyleCard, StyleContainer, StyleHeader } from './styled'
import ModalCreateProject from './ModalCreateProject'

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    render: text => <Flex flex='flex'><StyleAvatar mr={2} shape="square" size="large" icon="user"/>
      <div>
        <div>Name</div>
        {text}
      </div>
    </Flex>,
  },
  {
    dataIndex: 'author',
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
        {text}
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

const {Search} = Input

class ProjectListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  componentDidMount () {
    const { fetchProject } = this.props
    fetchProject()
  }

  showModal = () => {
    this.setState({visible: true})
  }

  handleCancel = () => {
    this.setState({visible: false})
  }

  handleCreate = () => {
    this.setState({visible: false})
  }

  render() {
    const {projects} = this.props
    return (
      <StyleContainer>
        <StyleCard p={2}>
          <StyleHeader>
            <h2>Projects</h2>
            <div>
              <Search
                placeholder="Search project name"
                onSearch={value => console.log(value)}
                style={{width: 200, marginLeft: '10px'}}
              />
            </div>
          </StyleHeader>
          <Button type="dashed" block onClick={this.showModal}><Icon type="plus"/>Add</Button>
          <ModalCreateProject
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
          {
            !_.isEmpty(projects) &&
            <Table columns={columns} dataSource={projects} rowKey="name" />
          }
        </StyleCard>
      </StyleContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: _.get(state, 'project.listProjects', {})
  }
}

const mapDispatchToProps = { fetchProject }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'project', reducer}),
  injectSaga({key: 'project', saga}),
) (ProjectListPage)
