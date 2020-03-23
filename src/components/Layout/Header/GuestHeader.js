import React, { Fragment } from 'react'
import { Menu, Drawer, Button } from 'antd'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { MenuOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'

import { isMobile } from '../../../utils/helpers'
import LocalStorage from '../../../utils/localStorage'
import { DOCS_URL } from '../../../config/constants'
import { ShowIf } from '../../Utils'

@observer
class GuestHeader extends React.PureComponent {
  @observable showDrawer = false

  @action toggleDrawer() {
    this.showDrawer = !this.showDrawer
  }

  isAuthenticated = () => {
    return !_.isEmpty(LocalStorage.getAccessToken())
  }

  renderMobile() {
    const {location} = this.props
    const isAuthenticated = this.isAuthenticated()

    return (
      <div>
        <Button onClick={() => this.toggleDrawer()}>
          <MenuOutlined/>
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          closable={true}
          onClose={() => this.toggleDrawer()}
          visible={this.showDrawer}
        >
          <Menu mode="vertical" style={{borderRight: 0}} defaultSelectedKeys={[location.pathname]}>
            <Menu.Item key='/'><Link to='/'>Features</Link></Menu.Item>
            <Menu.Item key='/develop-tools'>
              <a href={DOCS_URL}>Developer Tools</a>
            </Menu.Item>
            <Menu.Item key='/support'><Link to='/support'>Support</Link></Menu.Item>

            {
              isAuthenticated && <Menu.Item key='/dashboard'><Link to='/dashboard'>Dashboard</Link></Menu.Item>
            }

            {
              !isAuthenticated && <Menu.Item key='/sign-in'><Link to='/sign-in'>Sign-in</Link></Menu.Item>
            }
          </Menu>
        </Drawer>
      </div>

    )
  }

  renderDesktop() {
    const {location} = this.props
    const isAuthenticated = this.isAuthenticated()

    return (
      <Menu mode="horizontal" style={{lineHeight: '64px'}} defaultSelectedKeys={[location.pathname]}>
        <Menu.Item key='/'><Link to='/'>Features</Link></Menu.Item>
        <Menu.Item key='/develop-tools'>
          <a href={DOCS_URL}>Developer Tools</a>
        </Menu.Item>
        <Menu.Item key='/support'><Link to='/support'>Support</Link></Menu.Item>

        {
          isAuthenticated && <Menu.Item key='/dashboard'><Link to='/dashboard'>Dashboard</Link></Menu.Item>
        }

        {
          !isAuthenticated && <Menu.Item key='/sign-in'><Link to='/sign-in'>Sign-in</Link></Menu.Item>
        }
      </Menu>
    )
  }

  render() {
    return (
      <Fragment>
        <ShowIf condition={isMobile()}>
          {this.renderMobile()}
        </ShowIf>

        <ShowIf condition={!isMobile()}>
          {this.renderDesktop()}
        </ShowIf>
      </Fragment>
    )
  }
}

export default withRouter(GuestHeader)
