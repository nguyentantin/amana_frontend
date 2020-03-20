import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Typography } from 'antd'

import { PlatformIcon } from '../../components/CoreUI'
import { Box } from '../../styles/utility'

const { Title, Text } = Typography

class ProjectBasicInfo extends React.PureComponent {
  render() {
    const {project} = this.props

    return (
      <Fragment>
        <Title>{project.name}</Title>
        <Box>
          <Text strong>Platform: <PlatformIcon platform={project.platformType}/></Text>
        </Box>

        <Box>
          <Text strong>Author:</Text>
          <Text style={{marginLeft: '5px'}}>{_.get(project, 'author.name', '')}</Text>
        </Box>

        <Box>
          <Text strong>Descriptions:</Text>
          <Text style={{marginLeft: '5px'}}>{project.description}</Text>
        </Box>
      </Fragment>
    )
  }
}

ProjectBasicInfo.propTypes = {
  project: PropTypes.object.isRequired
}

export default ProjectBasicInfo
