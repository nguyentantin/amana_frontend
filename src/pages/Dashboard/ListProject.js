import styled from 'styled-components'
import { Avatar, Icon, List } from 'antd'
import React from 'react'
import _ from 'lodash'

import calling from '../../assets/images/calling.png'
import { Link } from 'react-router-dom'
import { PLATFORM_TYPE } from '../../config/constants'
import { ScrollContainer } from './styled'

const ListBuild = styled(List)`
  .name {
    margin-top: 10px;
    margin-bottom: 2px;
  }
`

export default class ListProject extends React.Component {
  render () {
    return (
      <ScrollContainer height="300px">
        <h4><Icon type="unordered-list" /> Build</h4>
        <ListBuild
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
                <Icon type={ item.platformType === PLATFORM_TYPE.ANDROID ? 'android' : 'apple' } /> {item.name}
              </Link>
              <p className="name"><Avatar size="small" icon="user" /> <Link to='/'>{_.get(item, 'author.name', '')}</Link></p>
            </List.Item>
          )}
        />
      </ScrollContainer>
    )
  }
}
