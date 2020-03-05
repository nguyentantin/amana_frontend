import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { map, isEmpty } from 'lodash'
import { withRouter } from 'react-router'

import helpers from '../../utils/helpers'

class AppRoutes extends PureComponent {
  static propTypes = {
    routes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  }

  isAuthenticated = () => {
    return !isEmpty(helpers.getAccessToken())
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
    const {routes, history} = this.props
    console.log(this.props)
    const isAuthenticated = this.isAuthenticated()

    return (
      <Switch>
        {
          map(routes, (route, key) => (
            <Route
              key={key}
              path={route.path}
              exact={route.exact}
              render={() => {
                if (route.requiredAuth && !isAuthenticated) {
                  return history.push('/sign-in')
                }

                if (route.restricted && isAuthenticated) {
                  return history.push('/dashboard')
                }

                return this.renderRoute(route)
              }}
            />
          ))
        }
      </Switch>
    )
  }
}

export default withRouter(AppRoutes)
