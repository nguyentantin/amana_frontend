import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import MasterLayout from './MasterLayout'
import Footer from './Footer'
import AppLogo from '../../assets/images/App_logo.png'
import { LogoWrapper, HeaderWrapper, ContentPage } from './styled'
import GuestHeader from './Header/GuestHeader'

class GuestLayout extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {activeClass: ''}
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

  render() {
    const {children} = this.props
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
            <GuestHeader/>
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
