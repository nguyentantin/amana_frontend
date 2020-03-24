import React from 'react'
import _ from 'lodash'
import { Tabs, Divider, Empty, Skeleton } from 'antd'
import { action, computed, observable, get, toJS } from 'mobx'
import { compose } from 'recompose'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import {
  BranchesOutlined,
  CodeOutlined,
  FundProjectionScreenOutlined,
  SettingFilled
} from '@ant-design/icons'

import ProjectRequest from '../../api/Request/ProjectRequest'
import { API_URL, PLATFORM_TYPE } from '../../config/constants'
import { Flex } from '../../styles/utility'
import { ShowIf } from '../../components/Utils'
import ListAppBuild  from './ListAppBuild'
import {
  ListBuild,
  StyleImg,
  Container,
  SmallTitle,
} from './styled'
import ProjectBasicInfo from './ProjectBasicInfo'
import CurrentBuildInfo from './CurrentBuildInfo'
import { Box } from '../../styles/utility'
import { AvatarBox } from '../../components/CoreUI'

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

  render() {
    return (
      <Container>
        <Flex flex={['block', 'flex']}>
          <Skeleton active avatar loading={this.loading}>
            <StyleImg pr={[0,20]} pb={20} textAlign={['center', 'left']}>
              <AvatarBox
                size={250}
                shape="square"
                alt=""
                name={this.projectDetail.name}
                style={{
                  fontSize: 100,
                  backgroundColor: this.projectDetail.color
                }}
              />
            </StyleImg>

            <ShowIf condition={!_.isEmpty(this.projectDetail)}>
              <ListBuild display='flex' alignItems='center'>
                <div>
                  <ProjectBasicInfo project={this.projectDetail}/>

                  <Box mt={2}>
                    <Link to={`/projects/${_.get(this.projectDetail, 'id')}/settings`}>
                      <SettingFilled/> Settings
                    </Link>
                  </Box>
                </div>
              </ListBuild>
            </ShowIf>
          </Skeleton>
        </Flex>

        <Divider/>

        <div>
          <h2>Current version <SmallTitle>The latest build</SmallTitle></h2>
          <Skeleton active avatar loading={this.loading}>
            <ShowIf condition={!_.isEmpty(_.get(this.projectDetail, 'currentVersion', {}))}>
              <CurrentBuildInfo build={_.get(this.projectDetail, 'currentVersion', {})} url={this.downloadUrl}/>
            </ShowIf>

            <ShowIf condition={_.isEmpty(_.get(this.projectDetail, 'currentVersion', {}))}>
              <Empty/>
            </ShowIf>
          </Skeleton>
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
                    <Skeleton active avatar loading={this.loading}>
                      <ListAppBuild
                        data={this.getDataByEnv(item.envKey)}
                        project={this.projectDetail}
                      />
                    </Skeleton>
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

const ProjectDetailCompose =  compose(
  withRouter,
)(ProjectDetail)

export default ProjectDetailCompose
