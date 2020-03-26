import QRCode from 'qrcode.react'
import React  from 'react'
import _ from 'lodash'
import { Button, Divider, Icon, Skeleton, Typography } from 'antd'
import { action, computed, get, observable, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router'

import AppBuildBasicInfo from './AppBuildBasicInfo'
import ProjectRequest from '../../api/Request/ProjectRequest'
import { API_URL, PLATFORM_TYPE } from '../../config/constants'
import { Box } from '../../styles/utility'
import { Flex } from '../../styles/utility'
import { GoBack } from '../../components/CoreUI'
import { ListBuild, Container, StyleImg, LinkDownload } from './styled'
import { ShowIf } from '../../components/Utils'
import { SmallTitle } from '../ProjectDetail/styled'
import { compose } from 'recompose'
import LocalStorage from '../../utils/localStorage'

@observer
class AppBuildDetail extends React.Component {
  @observable appBuild = {
    project: {
      author: {},
    }
  }

  @observable loading = false

  @action
  getAppBuild(projectId, appBuildId) {
    this.loading = true
    ProjectRequest.appBuildDetail(projectId, appBuildId)
      .then(({data}) => {
        this.appBuild = data
        this.loading = false
      })
  }

  @computed get isAndroid() {
    const appBuild = toJS(this.appBuild)
    return _.get(appBuild, 'project.platformType', '') === PLATFORM_TYPE.ANDROID
  }

  @computed get downloadUrl() {
    return `${API_URL}/app-builds/${get(this.appBuild, 'id')}/download.app?token=${LocalStorage.getAccessToken()}`
  }

  componentDidMount () {
    const { match: { params } } = this.props
    this.getAppBuild(params.projectId, params.appBuildId)
  }

  render() {
    const { Text } = Typography

    return (
      <Container>
        <GoBack/>

        <Divider style={{marginTop: 10, marginBottom: 10}}/>

        <Flex flex={['block', 'flex']}>
          <Skeleton active avatar loading={this.loading}>
            <StyleImg pr={[0,20]} pb={20} textAlign={['center', 'left']}>
              <QRCode
                value={this.downloadUrl}
                size={250}
              />
            </StyleImg>

            <ShowIf condition={!_.isEmpty(this.appBuild)}>
              <ListBuild display='flex' alignItems='center'>
                <div className="content-left">
                  <AppBuildBasicInfo appBuild={this.appBuild} />

                  <Box>
                    <Button className="btn-right" type="link" size='large'>
                      <Icon type="download"/>
                      <LinkDownload href={this.downloadUrl} download> Download </LinkDownload>
                    </Button>
                  </Box>
                </div>
              </ListBuild>
            </ShowIf>
          </Skeleton>
        </Flex>

        <Divider/>

        <div>
          <h2>Activities <SmallTitle>Recent activities on this app</SmallTitle></h2>
          <Text>coming soon...</Text>
        </div>
      </Container>
    )
  }
}

const enhance = compose(
  withRouter,
)

export default enhance(AppBuildDetail)
