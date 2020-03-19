import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown, Avatar } from 'antd'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import classNames from 'classnames'
import _ from 'lodash'

import MasterLayout from './MasterLayout'
import Footer from './Footer'
import AppLogo from '../../assets/images/App_logo.png'
import { LogoWrapper } from './styled'
import LocalStorage from '../../utils/localStorage'

const {Header, Content} = Layout

const HeaderWrapper = styled(Header)`
  background: #fff;
  padding: 0 30px;
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-menu {
    font-size: 18px;
    border: 0;
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
        .ant-menu-item {
        top: 0;
           a {
            color: #000;
          }
        } 
      }
    }
  }
`

const ContentPage = styled(Content)` {
  padding: 0;
  min-height: calc(100vh - 69px);
  padding-top: 100px;
  &.active {
    padding-top: 0;
  }
}`

class DashboardLayout extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      activeClass: ''
    }

    this.logout = this.logout.bind(this)
    this.scroll = this.scroll.bind(this)
  }


  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  scroll() {
    let activeClass = 'normal'
    if (window.scrollY === 0) {
      activeClass = 'top'
    }

    this.setState({activeClass})
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll)
  }

  logout() {
    const {history} = this.props
    LocalStorage.removeToken()
    LocalStorage.removeAuthInfo()

    history.push('/sign-in')
  }

  username() {
    const me = LocalStorage.getAuthInfo()
    return _.get(me, 'name')
  }

  render() {
    const {children, location} = this.props
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))
    const isActive = window.location.pathname === '/'

    const overlay = (
      <Menu>
        <Menu.Item key="0" onClick={this.logout}>
          Logout
        </Menu.Item>

        <Menu.Item key="1">
          Profile
        </Menu.Item>
      </Menu>
    )

    return (
      <MasterLayout>
        <Layout>
          <HeaderWrapper className={classNames({'active': isActive}, this.state.activeClass,)}>
            <LogoWrapper>
              <Link to='/'><img src={AppLogo} alt="Logo"/></Link>
            </LogoWrapper>

            <div>
              <Menu mode="horizontal" style={{lineHeight: '64px'}} defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key='/dashboard'><Link to='/dashboard'>Dashboard</Link></Menu.Item>
                <Menu.Item key='/develop-tools'><Link to='/projects'>Projects</Link></Menu.Item>
                <Menu.Item key='/support'><Link to='/apps'>Apps</Link></Menu.Item>
                <Menu.Item key='/time-sheets'><Link to='/time-sheets'>Time-Sheet</Link></Menu.Item>

                <Dropdown overlay={overlay}>
                  <span>
                    <Avatar size={30} icon="user"/>
                    <span style={{fontSize: '15px', marginLeft: '5px'}}>{this.username()}</span>
                  </span>
                </Dropdown>
              </Menu>
            </div>
          </HeaderWrapper>

          <ContentPage className={classNames({'active': isActive})}>
            {childrenWithProps}
          </ContentPage>

          <Footer/>
        </Layout>
      </MasterLayout>
    )
  }
}

export default withRouter(DashboardLayout)
