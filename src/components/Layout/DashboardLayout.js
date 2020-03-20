import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import classNames from 'classnames'

import MasterLayout from './MasterLayout'
import Footer from './Footer'
import AppLogo from '../../assets/images/App_logo.png'
import { LogoWrapper } from './styled'
import DashboardHeader from './Header/DashboardHeader'

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

  render() {
    const {children} = this.props
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))
    const isActive = window.location.pathname === '/'

    return (
      <MasterLayout>
        <Layout>
          <HeaderWrapper className={classNames({'active': isActive}, this.state.activeClass,)}>
            <LogoWrapper>
              <Link to='/'><img src={AppLogo} alt="Logo"/></Link>
            </LogoWrapper>

            <DashboardHeader/>
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
