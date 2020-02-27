import React, { memo } from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const RedirectRoute = ({redirectPath, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      <Redirect to={{
        pathname: redirectPath,
        state: {from: props.location}
      }}/>
    )}/>
  )
}

RedirectRoute.propTypes = {
  location: PropTypes.object,
  redirectPath: PropTypes.string.isRequired,
}

export default memo(RedirectRoute)
