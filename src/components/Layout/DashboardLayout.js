import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import MasterLayout from './MasterLayout'
import Footer from './Footer'
import AppLogo from '../../assets/images/App_logo.png'
import { LogoWrapper, HeaderWrapper, ContentPage } from './styled'
import DashboardHeader from './Header/DashboardHeader'

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
