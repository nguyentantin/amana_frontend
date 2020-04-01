import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Card, Col, Dropdown, Menu, Row } from 'antd'
import { DownOutlined, LogoutOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'

import LocalStorage from '../../utils/localStorage'
import { StyleTextMuted } from './styled'
import { UserAvatar } from '../../components/CoreUI'

const authInfo = () => {
  return LocalStorage.getAuthInfo()
}

const {Meta} = Card

class UserInfoCard extends React.PureComponent {
  constructor(props) {
    super(props)
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
          <Link to="/profile"><SettingOutlined/> Profile Settings</Link>
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
          marginBottom: 20,
          borderColor: 'rgba(217, 217, 217, 1)',
          borderRadius: 5,
        }}
        cover={
          <UserAvatar
            size={220}
            user={authInfo()}
            width={['100%!important', '270px!important']}
            fontSize={150}
            shape="square"
          />
        }
      >
        <Meta
          style={{
            padding: 15,
          }}
          title={
            <Row justify="space-around" align="middle">
              <Col span={20}>
                <div>
                  <UserOutlined/>
                  <StyleTextMuted fontSize={15} ml='5px'>{authInfo().name}</StyleTextMuted>
                </div>

                <div>
                  <MailOutlined/>
                  <StyleTextMuted fontSize={15} ml='5px' color='rgba(0, 0, 0, 0.45)'>{authInfo().email}</StyleTextMuted>
                </div>
              </Col>
              <Col span={4} style={{textAlign: 'right'}}>
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
