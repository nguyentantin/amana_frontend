import React from 'react'

import loadable from '../utils/loadable'
import LoadingPage from '../components/LoadingPage/LoadingPage'

const Application = loadable(() => import('../components/Application/Application'), {
  fallback: <LoadingPage/>,
})

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

export default [
  {
    component: Application,

    routes: [
      ...modulesRoute(),
      {path: '/404', component: PageNotFound},
      {path: '*', component: PageNotFound},
    ]
  },
]
