import React, { memo } from 'react'
import { Redirect, Route } from 'react-router-dom'

import helpers from '../utils/helpers'

const PrivateRoute = ({component: Component, ...rest}) => {
  const isAuthenticated = helpers.getAccessToken()

  if (isAuthenticated) {
    return <Route {...rest} render={props => <Component/>}/>
  }

  return (
    <Route {...rest} render={props => <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}/>
  )
}

export default memo(PrivateRoute)
