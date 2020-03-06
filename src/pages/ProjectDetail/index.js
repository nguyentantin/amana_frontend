import React from 'react'
import {List, Avatar, Button, Tabs, Icon} from 'antd'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'
import ProjectRequest from '../../api/Request/ProjectRequest'
import { compose } from 'recompose'

const { TabPane } = Tabs;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
]

const ListBuild = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .content-left {
    padding: 0 8px;
  }
`

const divImg = {
  paddingRight: '40px',
  paddingBottom: '20px'
}

const divContainer = {
  paddingTop: '40px',
}

const hrStyle = {
  border: '0',
  marginBottom: '20px',
  height: '1px',
  background: '#333',
  backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)',
}

const SmallTitle =  styled.small`
    font-size: 69%;
    color: rgba(0, 0, 0, 0.45);
  `

@observer
class ProjectDetail extends React.Component {
  @observable projectDetail = {}
  @observable loading = false

  @action
  getProject(projectId) {
    this.loading = true
    ProjectRequest.detail(projectId)
      .then((data) => {
        this.projectDetail = data
        this.loading = false
      })
  }

  componentDidMount () {
    const { match: {params} } = this.props
    this.getProject(params.projectId)
  }

  render() {
    return (
      <div className="container" style={divContainer}>
        <div className="d-flex">
          <div style={divImg}>
            <img src="https://via.placeholder.com/250x250.png" alt=""/>
          </div>
          <ListBuild>
            <div className="content-left">
              <h3>Project Name: {this.projectDetail.name}</h3>
              <p>Descriptions: {this.projectDetail.description}</p>
              <p>Platform: {this.projectDetail.platformType}</p>
              <p>Author: {this.projectDetail.author ? this.projectDetail.author.name: ''}</p>
            </div>
            <Button className="btn-right" shape="round" type="primary" size='large'>Build App</Button>
          </ListBuild>
        </div>
        <hr style={hrStyle}/>
        <div>
          <h2>Activities <SmallTitle>Recent activities on this app.</SmallTitle></h2>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <Icon type="apple" />
                  Tab 1
                </span>
              }
              key="1"
            >
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar size={55} icon="user" />}
                      title={<Link to='/'>{item.title}</Link>}
                      description="By si-01"
                    />
                    <Link to='/'>Run</Link>
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="android" />
                  Tab 2
                </span>
              }
              key="2"
            >
              Tab 2
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

const enhance = compose(
  withRouter,
)

export default enhance(ProjectDetail)
