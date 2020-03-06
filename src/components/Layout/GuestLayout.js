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
import { isEmpty } from 'lodash'
import helpers from '../../utils/helpers'

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
  padding-top: 64px;
  &.active {
    padding-top: 0;
  }
}`

class GuestLayout extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {activeClass: ''}
  }

  _isMounted = false

  static propTypes = {
    children: PropTypes.node.isRequired,
  }


  isAuthenticated = () => {
    return !isEmpty(helpers.getAccessToken())
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

  render() {
    const {children, location} = this.props
    const isAuthenticated = this.isAuthenticated()

    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))
    const isActive = window.location.pathname
    let className
    if (isActive === '/') {
      className = 'active'
    } else {
      className = ''
    }

    return (
      <MasterLayout>
        <Layout>
          <HeaderWrapper className={`${this.state.activeClass} ${className}`}>
            <LogoWrapper>
              <Link to='/'><img src={AppLogo} alt="Logo"/></Link>
            </LogoWrapper>

            <div>
              <Menu mode="horizontal" style={{lineHeight: '64px'}} defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key='/'><Link to='/'>Features</Link></Menu.Item>
                <Menu.Item key='/develop-tools'><Link to='/develop-tools'>Developer Tools</Link></Menu.Item>
                <Menu.Item key='/support'><Link to='/support'>Support</Link></Menu.Item>

                {
                  isAuthenticated && <Menu.Item key='/dashboard'><Link to='/dashboard'>Dashboard</Link></Menu.Item>
                }

                {
                  !isAuthenticated && <Menu.Item key='/sign-in'><Link to='/sign-in'>Sign-in</Link></Menu.Item>
                }
              </Menu>
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

export default withRouter(GuestLayout)
