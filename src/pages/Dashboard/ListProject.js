import styled from 'styled-components'
import { Avatar, Icon, List } from 'antd'
import React from 'react'
import _ from 'lodash'

import { Link } from 'react-router-dom'
import { ScrollContainer } from './styled'
import { getFirstCapitalizedLetter, truncate } from '../../utils/truncate'
import { PullRequestOutlined } from '@ant-design/icons'
import { PlatformIcon } from '../../components/CoreUI'
import { Box } from '../../styles/utility'

const ListBuild = styled(List)`
  .name {
    margin-top: 10px;
    margin-bottom: 2px;
  }
`

const ListBuildContainer = styled(ScrollContainer)`
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
      <ListBuildContainer height={['auto', 300]} mb={[20, 0]}>
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
                <React.Fragment>
                    <p>29 <PullRequestOutlined /></p>
                    <TextMute>29 minutes</TextMute>
                </React.Fragment>
              }
            >
              <Link to={`/projects/${item.id}`}>
                  <PlatformIcon platform={item.platformType}/> {truncate(item.name, 15)}
              </Link>

              <Box mt={10} mb={2}>
                  <Avatar size="small" src={item.avatar}>{upperCaseProjectName(item.name)}</Avatar>

                {_.get(item, 'author.name', '')}
              </Box>
            </List.Item>
          )}
        />
      </ListBuildContainer>
    )
  }
}
