import QRCode from 'qrcode.react'
import React from 'react'
import _ from 'lodash'
import { Button, Divider, Skeleton } from 'antd'
import { action, computed, get, observable, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router'

import AppBuildBasicInfo from './AppBuildBasicInfo'
import ProjectRequest from '../../api/Request/ProjectRequest'
import { API_URL, PLATFORM_TYPE } from '../../config/constants'
import { Box } from '../../styles/utility'
import { Flex } from '../../styles/utility'
import { GoBack } from '../../components/CoreUI'
import { ListBuild, StyleImg, LinkDownload } from './styled'
import { ShowIf } from '../../components/Utils'
import { marginRight, SmallTitle } from '../ProjectDetail/styled'
import { compose } from 'recompose'
import LocalStorage from '../../utils/localStorage'
import { DownloadOutlined } from '@ant-design/icons'
import AppBuildRequest from '../../api/Request/AppBuildRequest'
import DownloadHistory from './DownloadHistory'

@observer
class AppBuildDetail extends React.Component {
  @observable appBuild = {
    project: {
      author: {},
    }
  }
  @observable loading = false
  @observable loadingHistories = false
  @observable histories = []
  @observable pagination = {}

  @action
  getAppBuild(projectId, appBuildId) {
    this.loading = true
    ProjectRequest.appBuildDetail(projectId, appBuildId)
      .then(({data}) => {
        this.appBuild = data
        this.loading = false
      })
  }

  @action fetchDownloadHistories(queries = {}) {
    const {match: {params}} = this.props

    this.loadingHistories = true
    AppBuildRequest
      .downloadHistories(params.appBuildId, queries)
      .then((response) => {
        const {data} = response
        this.histories = _.concat(this.histories, data.data)
        this.pagination = data.meta
      })
      .finally(() => {
        this.loadingHistories = false
      })
  }

  @computed get isAndroid() {
    const appBuild = toJS(this.appBuild)
    return _.get(appBuild, 'project.platformType', '') === PLATFORM_TYPE.ANDROID
  }

  @computed get downloadUrl() {
    return `${API_URL}/app-builds/${get(this.appBuild, 'id')}/download.app?token=${LocalStorage.getAccessToken()}`
  }

  @computed get hasMore() {
    const meta = toJS(this.pagination)
    return meta.currentPage !== meta.lastPage
  }

  @action onLoadMore() {
    const meta = toJS(this.pagination)

    const page = meta.currentPage + 1

    this.fetchDownloadHistories({page})
  }

  componentDidMount() {
    const {match: {params}} = this.props
    this.getAppBuild(params.projectId, params.appBuildId)
    this.fetchDownloadHistories()
  }

  render() {
    return (
      <Box pb='40px'>
        <GoBack/>

        <Divider style={{marginTop: 10, marginBottom: 10}}/>

        <Flex flex={['block', 'flex']}>
          <Skeleton active avatar loading={this.loading}>
            <StyleImg pr={[0, 20]} pb={20} textAlign={['center', 'left']}>
              <QRCode
                value={this.downloadUrl}
                size={250}
              />
            </StyleImg>

            <ShowIf condition={!_.isEmpty(this.appBuild)}>
              <ListBuild display='flex' alignItems='center'>
                <div className="content-left">
                  <AppBuildBasicInfo appBuild={this.appBuild}/>

                  <Box mt={2}>
                    <Button className="btn-right" type="primary" style={marginRight}>
                      <DownloadOutlined/>
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

          <ShowIf condition={!_.isEmpty(this.histories)}>
            <DownloadHistory histories={this.histories} loading={this.loadingHistories}/>

            <ShowIf condition={this.hasMore}>
              <Box textAlign='center'>
                <Button loading={this.loadingHistories} onClick={() => this.onLoadMore()}>Load more</Button>
              </Box>
            </ShowIf>
          </ShowIf>
        </div>
      </Box>
    )
  }
}

const enhance = compose(
  withRouter,
)

export default enhance(AppBuildDetail)
