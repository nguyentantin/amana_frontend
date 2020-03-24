import { Icon, List, Skeleton, Tag } from 'antd'
import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { PullRequestOutlined } from '@ant-design/icons'

import { ListBuildContainer, TextMute } from './styled'
import { truncate } from '../../utils/helpers'
import { AvatarBox, PlatformIcon } from '../../components/CoreUI'
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
      <ListBuildContainer height={['auto', 300]} mb={[20, 0]}>
        <h4><Icon type="unordered-list" /> Build</h4>
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
                    <Link to={`/projects/${item.id}`}>
                      <PlatformIcon platform={item.platformType}/> {truncate(item.name, 15)}
                    </Link>

                    <Box mt={10} mb={2}>
                      <AvatarBox size="small" src={item.avatar} name={item.name} style={{ backgroundColor: item.color }}/> {_.get(item, 'author.name', '')}
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
