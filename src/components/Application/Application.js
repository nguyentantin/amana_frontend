import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppRoutes from './AppRoutes'

export default class Application extends Component {
  static propTypes = {
    route: PropTypes.oneOfType([PropTypes.object]).isRequired,
  }

  static contextTypes = {
    router: PropTypes.oneOfType([PropTypes.object]),
  }

  render() {
    const {route} = this.props

    return (
      <AppRoutes routes={route.routes}/>
    )
  }
}
