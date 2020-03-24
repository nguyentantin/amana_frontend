import React from 'react'

import { Tabs } from 'antd'
import { Box } from '../../styles/utility'
import * as Styled from './styled'
import MemberSetting from './MemberSetting'
import BuildSetting from './BuildSetting'

const {TabPane} = Tabs

class ProjectSetting extends React.Component {
  render() {
    return (
      <Styled.Container>
        <Box bg="#fff" p={16} borderColor='#fff'>
          <Tabs type="card">
            <TabPane tab='Member Settings' key='1'>
              <MemberSetting/>
            </TabPane>

            <TabPane tab='Build Settings' key='2'>
              <BuildSetting/>
            </TabPane>
          </Tabs>
        </Box>
      </Styled.Container>
    )
  }
}

export default ProjectSetting
