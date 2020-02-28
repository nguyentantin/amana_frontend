import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import MasterLayout from './MasterLayout'
import Footer from './Footer'
import AppLogo from '../../assets/images/App_logo.png'
import { LogoWrapper } from './styled'

const {Header, Content} = Layout


const HeaderWrapper = styled(Header)`
  background: #fff !important;
  padding: 0;
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-menu {
    font-size: 18px;
  }
`

class GuestLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const {children, location} = this.props
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))

    return (
      <MasterLayout>
        <Layout>
          <HeaderWrapper>
            <div className="container flex-center">
              <LogoWrapper>
                <Link to='/'><img src={AppLogo} alt="Logo"/></Link>
              </LogoWrapper>

              <div>
                <Menu mode="horizontal" style={{lineHeight: '64px'}} defaultSelectedKeys={[location.pathname]}>
                  <Menu.Item key='/'><Link to='/'>Features</Link></Menu.Item>
                  <Menu.Item key='/develop-tools'><Link to='/develop-tools'>Developer Tools</Link></Menu.Item>
                  <Menu.Item key='/support'><Link to='/support'>Support</Link></Menu.Item>
                  <Menu.Item key='/sign-in'><Link to='/sign-in'>SignIn</Link></Menu.Item>
                  <Menu.Item key='/sign-up'><Link to='/sign-up'>SignUp</Link></Menu.Item>
                </Menu>
              </div>
            </div>
          </HeaderWrapper>

          <Content style={{padding: '0', marginTop: 64, minHeight: 'calc(100vh - 133px)'}}>
            {childrenWithProps}
          </Content>

          <Footer/>
        </Layout>
      </MasterLayout>
    )
  }
}

export default withRouter(GuestLayout)
