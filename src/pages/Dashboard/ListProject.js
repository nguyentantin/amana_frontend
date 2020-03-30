import { List, Skeleton, Tag } from 'antd'
import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { PullRequestOutlined, UnorderedListOutlined } from '@ant-design/icons'

import { ListBuildContainer, StyleLink, TextMute } from './styled'
import { truncate } from '../../utils/helpers'
import { PlatformIcon, UserAvatar } from '../../components/CoreUI'
import { Box } from '../../styles/utility'

const skeletonData = () => {
  const listData = []
  for(let i = 0; i < 2; i++) {
    listData.push({
      id: i,
      name: `Placeholder name ${i}`,
      description: `Placeholder description ${i}`
    })
  }

  return listData
}

export default class ListProject extends React.Component {
  render () {
    return (
      <ListBuildContainer height={['auto', 396]} mb={[20, 0]}>
        <h4><UnorderedListOutlined /> Build</h4>
        <List
          itemLayout="vertical"
          size="small"
          header={<div>Your Project</div>}
          bordered
          dataSource={this.props.loading ? skeletonData() : this.props.data}
          renderItem={item => (
            <React.Fragment>
              {
                this.props.loading
                  ? <Skeleton loading avatar active/>
                  : <List.Item
                    extra={
                      <React.Fragment>
                        <p><Tag color="blue">{item.totalAppBuilds || 0} <PullRequestOutlined/></Tag></p>
                        <TextMute>{item.latestAppBuild ? moment(_.get(item, 'latestAppBuild.createdAt', moment())).fromNow() : 'No Builds'}</TextMute>
                      </React.Fragment>
                    }
                  >
                    <StyleLink display='flex' to={`/projects/${item.id}`}>
                      <PlatformIcon platform={item.platformType}/> {truncate(item.name, 15)}
                    </StyleLink>

                    <Box mt={12}>
                      <UserAvatar size="small" user={_.get(item, 'author')}/> {_.get(item, 'author.name', '')}
                    </Box>
                  </List.Item>
              }
            </React.Fragment>

          )}
        />
      </ListBuildContainer>
    )
  }
}
