import React, { Fragment } from 'react'
import _ from 'lodash'
import { Typography } from 'antd'

import { EnvTag, PlatformIcon } from '../../components/CoreUI'
import { Box } from '../../styles/utility'

class AppBuildBasicInfo extends React.Component {
  render() {
    const {appBuild} = this.props
    const {Title, Text} = Typography

    return (
      <Fragment>
        <Title>{_.get(appBuild, 'appName', '')}</Title>

        <Box>
          <Text strong>Project:&nbsp;</Text>
          <Text>{_.get(appBuild, 'project.name', '')}</Text>
        </Box>

        <Box>
          <Text strong>Version:&nbsp;</Text>
          <Text>{_.get(appBuild, 'version', '')}</Text>
        </Box>

        <Box>
          <Text strong>Env:&nbsp;</Text>
          <EnvTag env={appBuild.env} />
        </Box>

        <Box>
          <Text strong>Commit:&nbsp;</Text>
          <Text>{_.get(appBuild, 'commitChanges', 'No changes')}</Text>
        </Box>

        <Box>
          <Text strong>Build Number:&nbsp;</Text>
          <Text>{_.get(appBuild, 'buildNumber', '')}</Text>
        </Box>

        <Box>
          <Text strong>Platform:&nbsp;</Text>
          <PlatformIcon platform={_.get(appBuild, 'project.platformType', 'ios')}/>
        </Box>

        <Box>
          <Text strong>Author:&nbsp;</Text>
          <Text>{_.get(appBuild, 'project.author.name', '')}</Text>
        </Box>

        <Box>
          <Text strong>Description:&nbsp;</Text>
          <Text>{_.get(appBuild, 'project.description', '')}</Text>
        </Box>
      </Fragment>
    )
  }
}

export default AppBuildBasicInfo
