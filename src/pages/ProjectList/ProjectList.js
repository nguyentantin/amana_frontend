import React from 'react'
import { Divider, Table, Progress, Icon, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
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
        <div>Lorem</div>
        {text}
      </div>
    </Flex>,
  },
  {
    dataIndex: 'owner',
    key: 'owner',
    render: owner => (
      <span>
        <div>Lorem</div>
        {owner}
      </span>
    ),
  },
  {
    dataIndex: 'daytime',
    key: 'daytime',
    render: daytime => (
      <span>
        <div>Lorem</div>
        {daytime}
      </span>
    ),
  },
  {
    dataIndex: 'progress',
    key: 'progress',
    width: 200,
    render: () => (
      <span>
        <Progress percent={60}/>
      </span>
    ),
  },
  {
    key: 'action',
    width: 150,
    render: () => (
      <span>
        <Link to='/'>Lorem</Link>
        <Divider type="vertical"/>
        <Link to='/' className="ant-dropdown-link">Lorem <Icon type="down"/></Link>
      </span>
    ),
  },
]

const data = [
  {
    key: '1',
    name: 'is simply dummy text of the printing',
    owner: 'dummy',
    daytime: '2020-03-16',
  },
  {
    key: '2',
    name: 'is simply dummy text of the printing',
    owner: ' dummy',
    daytime: '2020-03-16',
  },
  {
    key: '3',
    name: 'is simply dummy text of the printing',
    owner: 'dummy',
    daytime: '2020-03-16',
  },
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
    console.log('project1', this.props.project)
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
          <Table columns={columns} dataSource={data}/>,
        </StyleCard>
      </StyleContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: _.get(state, 'projects', {})
  }
}

const mapDispatchToProps = { fetchProject }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'project', reducer}),
  injectSaga({key: 'project', saga}),
) (ProjectListPage)
