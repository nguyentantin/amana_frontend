import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { List, Skeleton } from 'antd'

import { ProjectAvatar } from '../../components/CoreUI'
import { truncate } from '../../utils/helpers'
import { DescriptionLink, TextMute } from './styled'

class ItemRender extends React.Component{
  renderAvatar(item) {
    return (
      <ProjectAvatar
        size={55}
        project={item.project}
      />
    )
  }

  renderTitle(item) {
    const {commitChanges} = item
    return (
      <Link to={`/projects/${item.projectId}/app-build/${item.id}`}>
        <strong># {item.id} { truncate(commitChanges, 50) }</strong>
      </Link>
    )
  }

  renderDescription(item) {
    return (
      <DescriptionLink to={`/projects/${item.projectId}`}>{item.project.name}</DescriptionLink>
    )
  }

  render() {
    const {loading, item} = this.props
    const {createdAt} = item

    if (loading) {
      return <Skeleton loading avatar active/>
    }

    return (
      <List.Item>
        <List.Item.Meta
          avatar={this.renderAvatar(item)}
          title={this.renderTitle(item)}
          description={this.renderDescription(item)}
        />
        <div><TextMute>{ moment(createdAt).fromNow() }</TextMute></div>
      </List.Item>
    )
  }
}

export default ItemRender
