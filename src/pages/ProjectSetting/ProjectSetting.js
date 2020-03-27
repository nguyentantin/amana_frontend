import React from 'react'
import { Tabs } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { Box } from '../../styles/utility'
import MemberSetting from './MemberSetting'
import BuildSetting from './BuildSetting'

const {TabPane} = Tabs

class ProjectSetting extends React.Component {
  render() {
    const {match: {params}} = this.props

    return (
      <div className="project-setting">
        <Box m={3}>
          <Link to={`/projects/${params.projectId}`}>
            <LeftOutlined style={{ fontSize: '16px' }}/>
            Back
          </Link>
        </Box>
        <Tabs type="card">
          <TabPane tab='Member Settings' key='1'>
            <MemberSetting/>
          </TabPane>

          <TabPane tab='Build Settings' key='2'>
            <BuildSetting/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default withRouter(ProjectSetting)
