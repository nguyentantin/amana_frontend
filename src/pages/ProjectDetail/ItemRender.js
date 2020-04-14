import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'antd'

import { ProjectAvatar } from '../../components/CoreUI'

class ItemRender extends React.Component{
  renderAvatar() {
    const {project} = this.props

    return (
      <ProjectAvatar
        project={project}
        size={55}
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
