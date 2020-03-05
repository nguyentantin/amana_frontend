import React from 'react'

import { DashboardLayout } from '../../components/Layout'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const dashboard = loadable(() => import('../../pages/Dashboard'), {
  fallback: <LoadingPage/>,
})

const apps = loadable(() => import('../../pages/Apps'), {
  fallback: <LoadingPage/>,
})

export default [
  {
    path: '/dashboard',
    exact: true,
    component: dashboard,
    layout: DashboardLayout,
    requiredAuth: true
  },
  {
    path: '/apps',
    exact: true,
    component: apps,
    layout: DashboardLayout,
    requiredAuth: true
  },
]
