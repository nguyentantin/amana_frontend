import React from 'react'

import PrivateRoute from './PrivateRoute'
import RedirectRoute from './RedirectRoute'
import RestrictedRoute from './RestrictedRoute'

import loadable from '../utils/loadable'
import LoadingPage from '../components/LoadingPage/LoadingPage'

const PageNotFound = loadable(() => import('../pages/PageNotFound'), {
  fallback: <LoadingPage/>,
})

/**
 * Get List Route Modules.
 *
 * @returns {[]}
 */
const modulesRoute = () => {
  const requireModule = require.context('./modules', true, /\.js$/)
  const modules = []

  requireModule.keys().forEach((fileName) => {
    const module = requireModule(fileName).default
    modules.push(...module)
  })

  return modules
}

export {
  PrivateRoute,
  RestrictedRoute,
  RedirectRoute
}

export default [
  ...modulesRoute(),
  {path: '/404', component: PageNotFound},
  {path: '*', component: PageNotFound},
]
