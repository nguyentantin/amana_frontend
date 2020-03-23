import styled from 'styled-components'
import { Avatar, Icon, List } from 'antd'
import React from 'react'
import _ from 'lodash'

import { Link } from 'react-router-dom'
import { PLATFORM_TYPE } from '../../config/constants'
import { ScrollContainer } from './styled'
import { getFirstCapitalizedLetter, truncate } from '../../utils/truncate'
import { PullRequestOutlined } from '@ant-design/icons'

const ListBuild = styled(List)`
  .name {
    margin-top: 10px;
    margin-bottom: 2px;
  }
`

const ListBuildContainer = styled(ScrollContainer)`
    height: 300px;
    .ant-list-vertical .ant-list-item-extra {
        margin-left: 0px;
        text-align: right;
    }
`

const TextMute = styled.p`
    color: #CCC;
`

const upperCaseProjectName = string => getFirstCapitalizedLetter(string)

export default class ListProject extends React.Component {
  render () {
    return (
      <ListBuildContainer>
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
                <React.Fragment>
                    <p>29 <PullRequestOutlined /></p>
                    <TextMute>29 minutes</TextMute>
                </React.Fragment>
              }
            >
              <Link to={`/project/${item.id}`}>
                <Icon type={ item.platformType === PLATFORM_TYPE.ANDROID ? 'android' : 'apple' } /> {truncate(item.name, 15)}
              </Link>
              <p className="name">
                  <Avatar src={item.avatar} size="small">{ upperCaseProjectName(item.name) }</Avatar> <Link to='/'>{ truncate(_.get(item, 'author.name', ''), 15)}</Link>
              </p>
            </List.Item>
          )}
        />
      </ListBuildContainer>
    )
  }
}
