import { Avatar, Icon, List, Tag } from 'antd'
import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { PullRequestOutlined } from '@ant-design/icons'

import { ListBuildContainer, TextMute } from './styled'
import { getFirstCapitalizedLetter, truncate } from '../../utils/helpers'
import { PlatformIcon } from '../../components/CoreUI'
import { Box } from '../../styles/utility'
import { StyleLink } from './styled'

const upperCaseProjectName = string => getFirstCapitalizedLetter(string)

export default class ListProject extends React.Component {
  render () {
    return (
      <ListBuildContainer height={['auto', 300]} mb={[20, 0]}>
        <h4><Icon type="unordered-list" /> Build</h4>
        <List
          itemLayout="vertical"
          size="small"
          header={<div>Your Project</div>}
          bordered
          dataSource={this.props.data}
          renderItem={item => (
            <List.Item mt={12}
              extra={
                <React.Fragment>
                    <p><Tag color="blue">{item.totalAppBuilds || 0} <PullRequestOutlined /></Tag></p>
                    <TextMute>{ item.latestAppBuild ? moment(_.get(item, 'latestAppBuild.createdAt', moment())).fromNow() : 'No Builds' }</TextMute>
                </React.Fragment>
              }
            >
              <StyleLink display='flex' alignItems='center' to={`/projects/${item.id}`}>
                  <PlatformIcon platform={item.platformType}/> {truncate(item.name, 15)}
              </StyleLink>

              <Box mt={12}>
                <Avatar size="small" src={item.avatar}>{upperCaseProjectName(item.name)}</Avatar> {_.get(item, 'author.name', '')}
              </Box>
            </List.Item>
          )}
        />
      </ListBuildContainer>
    )
  }
}
