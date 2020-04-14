import React from 'react'
import _ from 'lodash'
import { AvatarBox } from '../../components/CoreUI'
import { Link } from 'react-router-dom'
import { List } from 'antd'
class ItemRender extends React.Component{
  renderAvatar() {
    const {project} = this.props

    return (
      <AvatarBox
        size={55}
        src={_.get(project, 'avatar', null)}
        style={{backgroundColor: _.get(project, 'color', null)}}
        name={_.get(project, 'name')}
      />
    )
  }

  renderTitle() {
    const {appBuild} = this.props

    return (
      <Link to={`/projects/${appBuild.projectId}/app-build/${appBuild.id}`}>
        <b># {appBuild.id} {appBuild.commitChanges}</b>
      </Link>
    )
  }

  renderDescription() {
    const {appBuild} = this.props
    return appBuild.filename
  }

  render() {
    return (
      <List.Item>
        <List.Item.Meta
          avatar={this.renderAvatar()}
          title={this.renderTitle()}
          description={this.renderDescription()}
        />
      </List.Item>
    )
  }
}

export default ItemRender
