import _ from 'lodash'
import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { List, Skeleton } from 'antd'

import { AvatarBox } from '../../components/CoreUI'
import { truncate } from '../../utils/helpers'
import { DescriptionLink, TextMute } from './styled'

class ItemRender extends React.Component{
  renderAvatar(item) {
    return (
      <AvatarBox
        size={55}
        src={_.get(item, 'project.avatar', null)}
        name={_.get(item, 'project.name', null)}
        style={{ backgroundColor: _.get(item, 'project.color', null) }}
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
