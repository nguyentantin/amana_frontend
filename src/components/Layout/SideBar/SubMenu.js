import React from 'react'
import { Menu } from "antd"
import PropTypes from 'prop-types'

class SubMenu extends React.Component {
  static propTypes = {
    item: PropTypes.oneOfType([PropTypes.object]).isRequired,
  }

  render() {
    const {item} = this.props

    return (
      <div>
        {item}
        <Menu.SubMenu>
          A
        </Menu.SubMenu>
      </div>
    )
  }
}

export default SubMenu
