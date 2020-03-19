import QRCode from 'qrcode.react'
import React from 'react'
import _ from 'lodash'
import { Button, Tabs, Icon, Popover } from 'antd'
import { action, computed, observable, get, toJS } from 'mobx'
import { compose } from 'recompose'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router'
import {
  AndroidFilled,
  AppleFilled,
  BranchesOutlined,
  CodeOutlined,
  FundProjectionScreenOutlined
} from '@ant-design/icons'

import ProjectRequest from '../../api/Request/ProjectRequest'
import { API_URL, PLATFORM_TYPE } from '../../config/constants'
import { Flex } from '../../styles/utility'
import { ShowIf } from '../../components/Utils'
import ListAppBuild  from './ListAppBuild'
import RoleManagerModal from './components/RoleManagerModal'
import store from './store'
import {
  ListBuild,
  divImg,
  Container,
  marginRight,
  hrStyle,
  iconStyle,
  SmallTitle,
  LinkDownload,
} from './styled'

const {TabPane} = Tabs

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

  componentDidMount() {
    const {match: {params}} = this.props
    this.getProject(params.projectId)
  }

  getDataByEnv(envKey) {
    return _.filter(this.projectDetail.appBuilds, (item) => item.env === envKey )
  }

  handleActiveRoleManagerModal() {
    store.toggleActiveRoleManagerModal()
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
                <h3>Project Name: {this.projectDetail.name}</h3>
                <p>Descriptions: {this.projectDetail.description}</p>
                <p>Latest Commit: # {_.get(this.projectDetail, 'currentVersion.commitChanges', '')}</p>
                <p>Platform: { this.isAndroid ? <AndroidFilled style={iconStyle}/> : <AppleFilled style={iconStyle}/> }</p>
                <p>Author: {this.projectDetail.author ? this.projectDetail.author.name: ''}</p>
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
                  <Button className="btn-right" type="primary" size='large' style={marginRight}>
                    <Icon type="qrcode"/>
                    QR Code
                  </Button>
                </Popover>

                <Button className="btn-right" type="primary" size='large' onClick={this.handleActiveRoleManagerModal}>
                  <Icon type="form"/>
                  Roles Manager
                </Button>
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
        <RoleManagerModal />
      </Container>
    )
  }
}

export default compose(
  withRouter,
)(ProjectDetail)
