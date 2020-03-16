import React from 'react'
import _ from 'lodash'
import {
  ListBuild,
  divImg,
  divContainer,
  marginRight,
  hrStyle,
  iconStyle,
  SmallTitle,
  LinkDownload,
} from './styled'
import { List, Avatar, Button, Tabs, Icon, Popover } from 'antd'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import QRCode from 'qrcode.react'
import { AppleFilled, AndroidFilled } from '@ant-design/icons'
import { action, computed, observable, get, toJS } from 'mobx'
import ProjectRequest from '../../api/Request/ProjectRequest'
import { compose } from 'recompose'
import { API_URL, PLATFORM_TYPE } from '../../config/constants'
import { ShowIf } from '../../components/Utils'
import { connect } from 'react-redux'
import { injectReducer, injectSaga } from '../../store'
import projectReducer from '../../store/modules/project/reducers'
import roleReducer from '../../store/modules/role/reducers'
import projectSaga from '../../store/modules/project/sagas'
import roleSaga from '../../store/modules/role/sagas'
import { getExternalMembers } from '../../store/modules/project/selectors'
import { getRoles } from '../../store/modules/role/selectors'
import { fetchExternalMembers } from '../../store/modules/project/actions'
import { fetchRoles } from '../../store/modules/role/actions'

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
    this.props.fetchRoles()
    this.props.fetchExternalMembers({id: this.props.match.params.projectId})
  }

  render() {
    return (
      <div className="container" style={divContainer}>
        <div className="d-flex">
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
                  <Button className="btn-right" type="primary" size='large'>
                    <Icon type="qrcode"/>
                    QR Code
                  </Button>
                </Popover>

              </div>
            </ListBuild>
          </ShowIf>
        </div>
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  externalMembers: getExternalMembers(state),
  roles: getRoles(state),
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
  withRouter,
)(ProjectDetail)
