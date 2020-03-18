import React from 'react'
import _ from 'lodash'
import QRCode from 'qrcode.react'
import { AppleFilled, AndroidFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { List, Avatar, Button, Tabs, Icon, Popover } from 'antd'
import { action, computed, observable, get, toJS } from 'mobx'
import { compose } from 'recompose'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router'
import ProjectRequest from '../../api/Request/ProjectRequest'
import { API_URL, PLATFORM_TYPE } from '../../config/constants'
import { Flex } from '../../styles/utility'
import { ShowIf } from '../../components/Utils'

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
import { RoleManagerModal } from './components/RoleManagerModal'

const {TabPane} = Tabs

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
]

@observer
class ProjectDetail extends React.Component {
  @observable projectDetail = {}
  @observable loading = false
  @observable activeRoleManagerModal = false

  constructor(props) {
    super(props);

    this.toggleRoleManagerModal = this.toggleRoleManagerModal.bind(this)
  }

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

  @action
  toggleRoleManagerModal() {
    this.activeRoleManagerModal = !this.activeRoleManagerModal
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
                <p>Platform: {this.isAndroid ? <AndroidFilled style={iconStyle}/> :
                  <AppleFilled style={iconStyle}/>}</p>
                <p>Author: {this.projectDetail.author ? this.projectDetail.author.name : ''}</p>

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

                <Button className="btn-right" type="primary" size='large' onClick={this.toggleRoleManagerModal}>
                  <Icon type="user-add"/>
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
            <TabPane
              tab={
                <span>
                  <Icon type="apple"/>
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
                      avatar={<Avatar size={55} icon="user"/>}
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
                  <Icon type="android"/>
                  Tab 2
                </span>
              }
              key="2"
            >
              Tab 2
            </TabPane>
          </Tabs>
        </div>
        <RoleManagerModal visible={this.activeRoleManagerModal} onCancel={this.toggleRoleManagerModal} onOk={this.toggleRoleManagerModal}/>
      </Container>
    )
  }
}

export default compose(
  withRouter,
)(ProjectDetail)
