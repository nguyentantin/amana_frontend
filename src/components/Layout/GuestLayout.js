import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MasterLayout from './MasterLayout'

class GuestLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const {children} = this.props
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))

    return (
      <MasterLayout>
        {childrenWithProps}
      </MasterLayout>
    )
  }
}

export default GuestLayout
