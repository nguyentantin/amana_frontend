import { Avatar, Icon, List } from 'antd'
import React from 'react'
import _ from 'lodash'

import calling from '../../assets/images/calling.png'
import { Link } from 'react-router-dom'
import { ScrollContainer } from './styled'
import { PlatformIcon } from '../../components/CoreUI'
import { Box } from '../../styles/utility'

export default class ListProject extends React.Component {
  render () {
    return (
      <ScrollContainer height={['auto', 300]} mb={[20, 0]}>
        <h4><Icon type="unordered-list" /> Build</h4>
        <List
          itemLayout="vertical"
          size="small"
          header={<div>Your Project</div>}
          bordered
          dataSource={this.props.data}
          renderItem={item => (
            <List.Item
              extra={
                <img
                  width={40}
                  alt="logo"
                  src={calling}
                />
              }
            >
              <Link to={`/projects/${item.id}`}>
                <PlatformIcon platform={item.platformType}/>
                {item.name}
              </Link>

              <Box mt={10} mb={2}>
                <Avatar size="small" icon="user"/>

                {_.get(item, 'author.name', '')}
              </Box>
            </List.Item>
          )}
        />
      </ScrollContainer>
    )
  }
}
