import React from 'react'
import styled from 'styled-components'
import { Avatar, List } from 'antd'
import { Link } from 'react-router-dom'
import { truncate } from '../../utils/truncate'
import { ScrollContainer } from './styled'
import moment from 'moment'

const SmallTitle =  styled.small`
    font-size: 69%;
    color: rgba(0, 0, 0, 0.45);
  `

const TextMute = styled.span`
    color: #CCC;
`

const DescriptionLink = styled(Link)`
    color: rgba(0, 0, 0, 0.45);
`

const ListAppBuild = (props) => {
  return (
    <ScrollContainer height="800px">
      <h2>Timeline <SmallTitle>Recent builds</SmallTitle></h2>
      <List
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={55} icon="user" />}
              title={<Link to={`/project/${item.projectId}/app-build/${item.id}`}><strong># {item.id} { truncate(item.commitChanges, 50) }</strong></Link>}
              description={<DescriptionLink to={`/project/${item.projectId}`}>item.project.name</DescriptionLink>}
            />
            <div><TextMute>{ moment(item.createdAt).fromNow() }</TextMute></div>
          </List.Item>
        )}
      />
    </ScrollContainer>
  )
}

export default ListAppBuild
