import React from 'react'
import { Row, Col, List, Avatar, Icon } from 'antd'
import { Link } from 'react-router-dom'
import styled from "styled-components";
import calling from '../../assets/images/calling.png'

const dataBuild = [
  'Calling Workchat #1',
  'Calling Workchat #2',
  'Calling Workchat #3',
  'Calling Workchat #4',
  'Calling Workchat #5',
];

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 5',
  },
  {
    title: 'Ant Design Title 6',
  },
  {
    title: 'Ant Design Title 7',
  },
  {
    title: 'Ant Design Title 8',
  },
  {
    title: 'Ant Design Title 9',
  },
  {
    title: 'Ant Design Title 10',
  },
];

const ListBuild = styled(List)`
  .name {
    margin-top: 10px;
    margin-bottom: 2px;
  }
`

const divContainer = {
  paddingTop: '40px',
}

const smallTitle = {
  fontSize: '69%',
  color: 'rgba(0, 0, 0, 0.45)',
}

class DashboardPage extends React.Component {
  render() {
    return (
      <div className="container" style={divContainer}>
        <Row gutter={20}>
          <Col span={6}>
            <div>
              <img style={{width: '100%', marginBottom: '20px'}} src="https://via.placeholder.com/250x300.png" alt=""/>
            </div>
            <h4><Icon type="unordered-list" /> Build</h4>
            <ListBuild
              itemLayout="vertical"
              size="small"
              header={<div>Your Own</div>}
              bordered
              dataSource={dataBuild}
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
                  <Icon type="apple" /> {item}
                  <p className="name"><Avatar size="small" icon="user" /> <Link to='/'>si-01</Link></p>
                </List.Item>
              )}
            />
          </Col>
          <Col span={18}>
            <h2>Timeline <small style={smallTitle}>Recent events</small></h2>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar size={55} icon="user" />}
                    title={<Link to='/'>{item.title}</Link>}
                    description="By si-01"
                  />
                  <div>20 days ago</div>
                </List.Item>
              )}
            />,
          </Col>
        </Row>
      </div>
    )
  }
}

export default DashboardPage
