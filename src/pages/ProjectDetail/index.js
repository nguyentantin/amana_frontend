import React from 'react'
import _ from 'lodash'
import { Button, Tabs, Icon, Divider, Empty } from 'antd'
import { action, computed, observable, get, toJS } from 'mobx'
import { compose } from 'recompose'
import { inject, observer, Provider } from 'mobx-react'
import { withRouter } from 'react-router'
import {
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
import {
  ListBuild,
  divImg,
  Container,
  SmallTitle,
} from './styled'
import store from './store'
import ProjectBasicInfo from './ProjectBasicInfo'
import CurrentBuildInfo from './CurrentBuildInfo'

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

@inject('store')
@observer
class ProjectDetail extends React.Component {
  @observable projectDetail = {
    appBuilds: []
  }
  @observable loading = false

  constructor(props) {
    super(props);

    this.handleActiveRoleManagerModal = this.handleActiveRoleManagerModal.bind(this)
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

  getDataByEnv(envKey) {
    return _.filter(this.projectDetail.appBuilds, (item) => item.env === envKey )
  }

  handleActiveRoleManagerModal() {
    this.props.store.toggleActiveRoleManagerModal()
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
              <div>
                <ProjectBasicInfo project={this.projectDetail}/>
                <Divider/>

                <Button className="btn-right" type="primary" size='large' onClick={this.handleActiveRoleManagerModal}>
                  <Icon type="form"/>
                  Roles Manager
                </Button>
              </div>
            </ListBuild>
          </ShowIf>
        </Flex>

        <Divider/>

        <div>
          <h2>Current version <SmallTitle>The latest build</SmallTitle></h2>
          <ShowIf condition={!_.isEmpty(_.get(this.projectDetail, 'currentVersion', {}))}>
            <CurrentBuildInfo build={_.get(this.projectDetail, 'currentVersion', {})} url={this.downloadUrl}/>
          </ShowIf>

          <ShowIf condition={_.isEmpty(_.get(this.projectDetail, 'currentVersion', {}))}>
            <Empty/>
          </ShowIf>
        </div>

        <Divider/>

        <div>
          <h2>Activities <SmallTitle>Recent activities on this app.</SmallTitle></h2>
          <Tabs defaultActiveKey="1">
            {
              listBuildEnv.map((item) => {
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
        <RoleManagerModal/>
      </Container>
    )
  }
}

const ProjectDetailCompose =  compose(
  withRouter,
)(ProjectDetail)

const ProjectDetailContainer = () => {
  return (
    <Provider store={store}><ProjectDetailCompose/></Provider>
  )
}

export default ProjectDetailContainer
