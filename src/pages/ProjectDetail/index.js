import React from 'react'
import _ from 'lodash'
import { Button, Icon, Popover, Tabs } from 'antd'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import QRCode from 'qrcode.react'
import {
  AndroidFilled,
  AppleFilled,
  BranchesOutlined,
  CodeOutlined,
  FundProjectionScreenOutlined
} from '@ant-design/icons'
import { action, computed, get, observable, toJS } from 'mobx'

import ProjectRequest from '../../api/Request/ProjectRequest'
import { compose } from 'recompose'
import { API_URL, PLATFORM_TYPE } from '../../config/constants'
import { ShowIf } from '../../components/Utils'
import { Flex } from '../../styles/utility'
import { container } from '../../styles/mixins'
import ListAppBuild  from './ListAppBuild'


const { TabPane } = Tabs;

const ListBuild = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .content-left {
    padding: 0 8px;
  }
`

const Container = styled.div`
  padding-bottom: 40px;
  ${container.centerBox}
`

const divImg = {
  paddingRight: '40px',
  paddingBottom: '20px'
}

const marginRight = {
  marginRight: '10px',
}

const hrStyle = {
  border: '0',
  marginBottom: '20px',
  height: '1px',
  background: '#333',
  backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)',
}

const appleStyle = {
  fontSize: '20px',
  color: '#bf5af2',
}

const androidStyle = {
  fontSize: '20px',
  color: '#8eba3e',
}

const SmallTitle =  styled.small`
    font-size: 69%;
    color: rgba(0, 0, 0, 0.45);
  `

const LinkDownload = styled.a`
  color: white;
  :hover {
    color: white
  }
`

const listBuildEnv = [
  {
    envKey: 1,
    envName: 'Develop',
    icon: <CodeOutlined />,
  },
  {
    envKey: 2,
    envName: 'Staging ',
    icon: <BranchesOutlined />,
  },
  {
    envKey: 3,
    envName: 'Production',
    icon: <FundProjectionScreenOutlined />,
  },
]

@observer
class ProjectDetail extends React.Component {
  @observable projectDetail = {
    appBuilds: []
  }
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

  @computed get isAndroid() {
    return get(this.projectDetail, 'platformType') === PLATFORM_TYPE.ANDROID
  }

  @computed get downloadUrl() {
    const project = toJS(this.projectDetail)
    return this.isAndroid ? _.get(project, 'currentVersion.s3Url', '') :
      `itms-services://?action=download-manifest&url=${API_URL}/app-builds/${_.get(project, 'currentVersion.id', '')}/manifest.plist`
  }

  componentDidMount () {
    const { match: {params} } = this.props
    this.getProject(params.projectId)
  }

  getDataByEnv(envKey) {
    return _.filter(this.projectDetail.appBuilds, (item) => item.env === envKey )
  }

  render() {
    return (
      <Container>
        <Flex flex='flex'>
          <div style={divImg}>
            <img src="https://via.placeholder.com/250x250.png" alt=""/>
          </div>
          <ShowIf condition={!_.isEmpty(this.projectDetail)}>
            <ListBuild>
              <div className="content-left">
                <h3># {_.get(this.projectDetail, 'currentVersion.id', '')} - {_.get(this.projectDetail, 'currentVersion.commitChanges', '')}</h3>
                <p>Project Name: {this.projectDetail.name}</p>
                <p>Platform: { this.isAndroid ? <AndroidFilled style={androidStyle}/> : <AppleFilled style={appleStyle}/> }</p>
                <p>Author: {_.get(this.projectDetail, 'author.name', '')}</p>
                <p>Descriptions: {this.projectDetail.description}</p>
                <Button className="btn-right" type="primary" size='large' style={marginRight}>
                  <Icon type="download"/>
                  <LinkDownload href={this.downloadUrl} download> Download </LinkDownload>
                </Button>
                <Popover
                  trigger="click"
                  placement="bottom"
                  content={
                    <QRCode value={this.downloadUrl}/>
                  }
                >
                  <Button className="btn-right" type="primary" size='large'>
                    <Icon type="qrcode"/>
                    QR Code
                  </Button>
                </Popover>

              </div>
            </ListBuild>
          </ShowIf>
        </Flex>
        <hr style={hrStyle}/>
        <div>
          <h2>Activities <SmallTitle>Recent activities on this app.</SmallTitle></h2>
          <Tabs defaultActiveKey="1">
            {
              listBuildEnv.map((item, index) => {
                return (
                  <TabPane
                    tab={
                      <span>
                        {item.icon} {item.envName}
                      </span>
                    }
                    key={item.envKey}
                  >
                    <ListAppBuild
                        data={this.getDataByEnv(item.envKey)}
                    />
                  </TabPane>
                )
              })
            }
          </Tabs>
        </div>
      </Container>
    )
  }
}

const enhance = compose(
  withRouter,
)

export default enhance(ProjectDetail)
