import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Col, Dropdown, Menu, Row } from 'antd'
import { DownOutlined, LogoutOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'

import LocalStorage from '../../utils/localStorage'
import { AvatarBox } from '../../components/CoreUI'


const authInfo = () => {
  return LocalStorage.getAuthInfo()
}

const { Meta } = Card

const textStyle = { fontSize: '15px', marginLeft: '5px' }

const TextMuted =  styled.small`
    color: rgba(0, 0, 0, 0.45);
  `

class UserInfoCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout() {
    const {history} = this.props
    LocalStorage.removeToken()
    LocalStorage.removeAuthInfo()

    history.push('/sign-in')
  }

  dropdownMenu() {
    return (
      <Menu>
        <Menu.Item>
          <Link to="/"><SettingOutlined/> Profile Settings</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/" onClick={this.logout}><LogoutOutlined/> Log Out</Link>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    return (
      <Card
        style={{
          backgroundColor: 'rgba(240, 242, 245, 1)',
          marginBottom: 20,
          borderColor: 'rgba(217, 217, 217, 1)',
        }}
        cover={
          <AvatarBox
            size={277}
            shape="square"
            style={{
              backgroundColor: authInfo().color,
              fontSize: 150,
            }}
            name={authInfo().name}
          />
        }
      >
        <Meta
          title={
              <Row justify="space-around" align="middle">
                <Col span={20}>
                  <div>
                    <UserOutlined/>
                    <span style={textStyle}>{authInfo().name}</span>
                  </div>

                  <div>
                    <MailOutlined/>
                    <TextMuted style={textStyle}>{authInfo().email}</TextMuted>
                  </div>
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                  <Dropdown overlay={this.dropdownMenu()} placement="bottomRight">
                    <DownOutlined/>
                  </Dropdown>
                </Col>
              </Row>
          }
        />
      </Card>
    )
  }
}

export default withRouter(UserInfoCard)
