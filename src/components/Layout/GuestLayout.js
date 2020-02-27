import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MasterLayout from './MasterLayout'

import { Layout, Menu } from 'antd'

import AppLogo from '../../assets/images/App_logo.png'

const {Header, Content, Footer} = Layout


class GuestLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const {children} = this.props
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))

    return (
      <MasterLayout>
        <Layout>
          <Header className="header">
            <div className="container flex-center">
            <span className="logo">
              <img src={AppLogo} alt=""/>
            </span>

              <div>
                <Menu mode="horizontal" style={{lineHeight: '64px'}}>
                  <Menu.Item>Features</Menu.Item>
                  <Menu.Item>Developer Tools</Menu.Item>
                  <Menu.Item>Support</Menu.Item>
                  <Menu.Item>SignIn</Menu.Item>
                  <Menu.Item>SignUp</Menu.Item>
                </Menu>
              </div>
            </div>
          </Header>

          <Content style={{padding: '0', marginTop: 64, minHeight: 'calc(100vh - 133px)'}}>
            {childrenWithProps}
          </Content>

          <Footer className='footer'>Auto Build Application ©2020 Created by SI1 Studio</Footer>
        </Layout>
      </MasterLayout>
    )
  }
}

export default GuestLayout
