import React from 'react'
import _ from 'lodash'
import { List } from 'antd'
import { Link } from 'react-router-dom'
import { AvatarBox } from '../../components/CoreUI'

export default class ListAppBuild extends React.PureComponent{
  render() {
    const { project, data } = this.props
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <AvatarBox
                  size={55}
                  src={_.get(project, 'avatar', null)}
                  style={{backgroundColor: _.get(project, 'color', null)}}
                  name={_.get(project, 'name')}
                />}
              title={<Link
                to={`/projects/${item.projectId}/app-build/${item.id}`}><b># {item.id} {item.commitChanges}</b></Link>}
              description={item.filename}
            />
          </List.Item>
        )}
      />
    )
  }
}
