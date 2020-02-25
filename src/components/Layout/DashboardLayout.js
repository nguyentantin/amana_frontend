// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import MasterLayout from './MasterLayout'
//
// export default class DashboardLayout extends Component {
//   static propTypes = {
//     children: PropTypes.node.isRequired,
//     history: PropTypes.oneOfType([PropTypes.object]).isRequired,
//     appStore: PropTypes.oneOfType([PropTypes.object]).isRequired,
//   }
//
//   render() {
//     const {children} = this.props
//     const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))
//
//     return (
//       <MasterLayout>
//         {childrenWithProps}
//       </MasterLayout>
//     )
//   }
// }

import React from 'react'
import { Layout, Menu, Icon } from 'antd'

const {Header, Content, Footer, Sider} = Layout

const style = {
  height: '32px',
  background: 'rgba(255, 255, 255, 0.2)',
  margin: '16px'
}

class DashboardLayout extends React.Component {
  render() {
    const {children} = this.props
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))

    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo" style={style}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Icon type="user"/>
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera"/>
              <span className="nav-text">nav 2</span>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{marginLeft: 200}}>
          <Header style={{background: '#fff', padding: 0}}/>

          <Content style={{margin: '24px 16px 0', overflow: 'initial',  height: 'calc(100vh - 64px)', background: '#fff'}}>
            <div style={{padding: 24, background: '#fff', textAlign: 'center'}}>
              {childrenWithProps}
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default DashboardLayout
