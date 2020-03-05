import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Avatar } from 'antd'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import MasterLayout from './MasterLayout'
import Footer from './Footer'
import AppLogo from '../../assets/images/App_logo.png'
import { LogoWrapper } from './styled'
import helpers from '../../utils/helpers'

const {Header, Content} = Layout

const HeaderWrapper = styled(Header)`
  background: #fff;
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
  &.active {
    background: transparent;
    transition-duration: 0.4s;
    .ant-menu {
      background: transparent;
      border-bottom: 0;
      .ant-menu-item > a {
        color: #fff;
      }
    }
    &.normal {
      background: #fff;
      .ant-menu {
        .ant-menu-item > a {
          color: #000;
        }
      }
    }
  }
`

const ContentPage = styled(Content)` {
  padding: 0;
  min-height: calc(100vh - 69px);
  padding-top: 64px;
  &.active {
    padding-top: 0;
  }
}`

class DashboardLayout extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {activeClass: ''}

    this.logout = this.logout.bind(this)
  }

  _isMounted = false

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  componentDidMount() {
    this._isMounted = true
    window.addEventListener('scroll', () => {
      if (this._isMounted) {
        let activeClass = 'normal'
        if (window.scrollY === 0) {
          activeClass = 'top'
        }
        this.setState({activeClass})
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  logout() {
    const {history} = this.props
    helpers.removeToken()

    history.push('/sign-in')

  }

  render() {
    const {children, location} = this.props
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))
    const isActive = window.location.pathname
    let className

    if (isActive === '/') {
      className = 'active'
    } else {
      className = ''
    }

    const overlay = (
      <Menu>
        <Menu.Item key="0" onClick={this.logout}>
          Logout
        </Menu.Item>

        <Menu.Item key="0">
          Profile
        </Menu.Item>
      </Menu>
    )

    return (
      <MasterLayout>
        <Layout>
          <HeaderWrapper className={`${this.state.activeClass} ${className}`}>
            <div className="container flex-center">
              <LogoWrapper>
                <Link to='/'><img src={AppLogo} alt="Logo"/></Link>
              </LogoWrapper>

              <div>
                <Menu mode="horizontal" style={{lineHeight: '64px'}} defaultSelectedKeys={[location.pathname]}>
                  <Menu.Item key='/'><Link to='/dashboard'>Dashboard</Link></Menu.Item>
                  <Menu.Item key='/develop-tools'><Link to='/projects'>Projects</Link></Menu.Item>
                  <Menu.Item key='/support'><Link to='/apps'>Apps</Link></Menu.Item>

                  <Dropdown overlay={overlay}>
                    <Avatar size={30} icon="user"/>
                  </Dropdown>
                </Menu>
              </div>
            </div>
          </HeaderWrapper>

          <ContentPage className={className}>
            {childrenWithProps}
          </ContentPage>

          <Footer/>
        </Layout>
      </MasterLayout>
    )
  }
}

export default withRouter(DashboardLayout)
