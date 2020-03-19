import React from 'react'
import _ from 'lodash'
import { Button, Icon, Popover } from 'antd'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import QRCode from 'qrcode.react'
import { AndroidFilled, AppleFilled } from '@ant-design/icons'
import { action, computed, get, observable, toJS } from 'mobx'

import ProjectRequest from '../../api/Request/ProjectRequest'
import { compose } from 'recompose'
import { API_URL, PLATFORM_TYPE } from '../../config/constants'
import { ShowIf } from '../../components/Utils'
import { Flex } from '../../styles/utility'
import { container } from '../../styles/mixins'


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

const appleStyle = {
  fontSize: '20px',
  color: '#bf5af2',
}

const androidStyle = {
  fontSize: '20px',
  color: '#8eba3e',
}

const LinkDownload = styled.a`
  color: white;
  :hover {
    color: white
  }
`

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
    return this.isAndroid ? get(this.appBuild, 's3Url') :
      `itms-services://?action=download-manifest&url=${API_URL}/app-builds/${get(this.appBuild, 'id')}/manifest.plist`
  }

  componentDidMount () {
    const { match: { params } } = this.props
    this.getAppBuild(params.projectId, params.appBuildId)
  }

  render() {
    return (
      <Container>
        <Flex flex='flex'>
          <div style={divImg}>
            <img src="https://via.placeholder.com/250x250.png" alt=""/>
          </div>
          <ShowIf condition={!_.isEmpty(this.appBuild)}>
            <ListBuild>
              <div className="content-left">
                <h3># {this.appBuild.id} - {this.appBuild.commitChanges}</h3>
                <p>Project Name: {_.get(this.appBuild, 'project.name', '')}</p>
                <p>Platform: { this.isAndroid ? <AndroidFilled style={androidStyle}/> : <AppleFilled style={appleStyle}/> }</p>
                <p>Author: {_.get(this.appBuild, 'project.author.name', '')}</p>
                <p>Descriptions: {_.get(this.appBuild, 'project.description', '')}</p>

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
      </Container>
    )
  }
}

const enhance = compose(
  withRouter,
)

export default enhance(AppBuildDetail)
