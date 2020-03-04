import React, { memo } from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import helpers from '../utils/helpers'

const RestrictedRoute = ({component: Component, ...rest}) => {
  const isAuthenticated = helpers.getAccessToken()

  return (
    <Route {...rest} render={props => (
      isAuthenticated ? <Redirect
        to={{
          pathname: '/dashboard',
          state: {from: props.location}
        }}
      /> : <Route {...rest} render={props => <Component/>}/>
    )}/>
  )
}

RestrictedRoute.propTypes = {
  location: PropTypes.object,
}

export default memo(RestrictedRoute)
