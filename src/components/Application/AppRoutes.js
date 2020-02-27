import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { map } from 'lodash'

export default class AppRoutes extends PureComponent {
  static propTypes = {
    routes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  }

  renderRoute(route) {
    const RouteComponent = route.component

    if (route.layout) {
      const LayoutComponent = route.layout

      return (
        <LayoutComponent>
          <RouteComponent/>
        </LayoutComponent>
      )
    }

    return <RouteComponent/>
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
              render={() => (
                this.renderRoute(route)
              )}
            />
          ))
        }
      </Switch>
    )
  }
}
