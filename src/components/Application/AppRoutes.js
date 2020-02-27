import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { map } from 'lodash'

export default class AppRoutes extends Component {
  static propTypes = {
    routes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  }

  render() {
    const {routes} = this.props

    return (
      <Switch>
        {
          map(routes, (route, key) => (
            <Route
              key={key}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))
        }
      </Switch>
    )
  }
}
