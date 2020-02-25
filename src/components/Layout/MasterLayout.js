import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Styled from './styled'

export default class MasterLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const {children} = this.props
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))

    return (
      <Styled.MasterLayoutWrapper>
        {childrenWithProps}
      </Styled.MasterLayoutWrapper>
    )
  }
}
