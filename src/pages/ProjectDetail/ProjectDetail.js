import _ from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Divider, Empty, Skeleton, Spin } from 'antd'
import { compose } from 'recompose'
import { inject, observer, Provider } from 'mobx-react'
import { withRouter } from 'react-router'
import {
  BranchesOutlined,
  CodeOutlined,
  FundProjectionScreenOutlined,
  SettingFilled
} from '@ant-design/icons'

import CurrentBuildInfo from './CurrentBuildInfo'
import ListAppBuild from './ListAppBuild'
import MobStore from './MobStore'
import ProjectBasicInfo from './ProjectBasicInfo'
import { ProjectAvatar } from '../../components/CoreUI'
import { Box } from '../../styles/utility'
import { Flex, SpinWrapper } from '../../styles/utility'
import { ShowIf } from '../../components/Utils'
import {
  ListBuild,
  StyleImg,
  SmallTitle,
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

@inject('store')
@observer
class ProjectDetail extends React.Component {
  componentDidMount() {
    const {match: {params}} = this.props
    this.props.store.getProject(params.projectId)
  }

  getDataByEnv(envKey) {
    const { appBuilds } = this.props.store
    return _.filter(appBuilds, (item) => item.env === envKey)
  }

  render() {
    const { project, currentVersion, getProjectLoading, downloadUrl, getMoreAppBuildsLoading } = this.props.store

    return (
      <Box pb='40px'>
        <Flex flex={['block', 'flex']}>
          <Skeleton active avatar loading={getProjectLoading}>
            <StyleImg pr={[0, 20]} pb={20} textAlign={['center', 'left']}>
              <ProjectAvatar
                project={project}
                size={250}
                shape="square"
                alt=""
                fontSize={100}
              />
            </StyleImg>

            <ShowIf condition={!_.isEmpty(project)}>
              <ListBuild display='flex' alignItems='center'>
                <div>
                  <ProjectBasicInfo project={project}/>

                  <ShowIf condition={project.isProjectManager}>
                    <Box mt={2}>
                      <Link to={`/projects/${_.get(project, 'id')}/settings`}>
                        <SettingFilled/> Settings
                      </Link>
                    </Box>
                  </ShowIf>
                </div>
              </ListBuild>
            </ShowIf>
          </Skeleton>
        </Flex>

        <Divider/>

        <div>
          <h2>Current version <SmallTitle>The latest build</SmallTitle></h2>
          <Skeleton active avatar loading={getProjectLoading}>
            <ShowIf condition={!_.isEmpty(currentVersion)}>
              <CurrentBuildInfo build={currentVersion} url={downloadUrl}/>
            </ShowIf>

            <ShowIf condition={_.isEmpty(currentVersion)}>
              <Empty/>
            </ShowIf>
          </Skeleton>
        </div>

        <Divider/>

        <div>
          <h2>Other builds <SmallTitle>Recent builds on this app.</SmallTitle></h2>
          <Tabs defaultActiveKey="1">
            {
              listBuildEnv.map((item) => {
                return (
                  <TabPane
                    tab={<span>{item.icon} {item.envName}</span>}
                    key={item.envKey}
                  >
                    <Skeleton active avatar loading={getProjectLoading}>
                      <div style={{position: 'relative'}}>
                        <ListAppBuild
                          data={this.getDataByEnv(item.envKey)}
                          project={project}
                        />
                        <SpinWrapper style={{bottom: 50}}><Spin spinning={getMoreAppBuildsLoading}/></SpinWrapper>
                      </div>
                    </Skeleton>
                  </TabPane>
                )
              })
            }
          </Tabs>
        </div>
      </Box>
    )
  }
}

const ProjectDetailCompose = compose(
  withRouter,
)(ProjectDetail)

const ProjectDetailContainer = () => (
  <Provider store={MobStore}>
    <ProjectDetailCompose/>
  </Provider>
)

export default ProjectDetailContainer
