import React from 'react'
import { Avatar, List } from 'antd'
import { Link } from 'react-router-dom'

export default class ListAppBuild extends React.PureComponent{
    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.props.data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar size={55} icon="user" />}
                            title={<Link to='/'><b># {item.id} {item.commitChanges}</b></Link>}
                            description={item.filename}
                        />
                    </List.Item>
                )}
            />
        )
    }
}
