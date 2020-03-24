import React, { Fragment } from 'react'
import { Button, Drawer, Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { MenuOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'

import { isMobile } from '../../../utils/helpers'
import LocalStorage from '../../../utils/localStorage'
import { ShowIf } from '../../Utils'
import { AvatarBox } from '../../CoreUI'

@observer
class DashboardHeader extends React.PureComponent {
  @observable showDrawer = false

  @action toggleDrawer() {
    this.showDrawer = !this.showDrawer
  }

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
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

  color() {
    const me = LocalStorage.getAuthInfo()
    return _.get(me, 'color')
  }

  renderMobile() {
    const {location} = this.props

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
          <Menu mode="vertical" defaultSelectedKeys={[location.pathname]} style={{borderRight: 0}}>
            <Menu.Item key='/dashboard'><Link to='/dashboard'>Dashboard</Link></Menu.Item>
            <Menu.Item key='/develop-tools'><Link to='/projects'>Projects</Link></Menu.Item>
            {/* <Menu.Item key='/time-sheets'><Link to='/time-sheets'>Time-Sheet</Link></Menu.Item> */}
            <Menu.Item key='0' onClick={this.logout}>Logout</Menu.Item>
          </Menu>
        </Drawer>
      </div>

    )
  }

  renderDesktop() {
    const {location} = this.props

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
      <div>
        <Menu mode="horizontal" style={{lineHeight: '64px'}} defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key='/dashboard'><Link to='/dashboard'>Dashboard</Link></Menu.Item>
          <Menu.Item key='/develop-tools'><Link to='/projects'>Projects</Link></Menu.Item>
          {/*<Menu.Item key='/time-sheets'><Link to='/time-sheets'>Time-Sheet</Link></Menu.Item>*/}

          <Dropdown overlay={overlay}>
            <span>
              <AvatarBox size={30} name={this.username()} style={{backgroundColor: this.color()}}/>
              <span style={{fontSize: '15px', marginLeft: '5px'}}>{this.username()}</span>
            </span>
          </Dropdown>
        </Menu>
      </div>
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

export default withRouter(DashboardHeader)
