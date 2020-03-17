import React from 'react'

import { DashboardLayout } from '../../components/Layout'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const dashboard = loadable(() => import('../../pages/Dashboard/Dashboard'), {
  fallback: <LoadingPage/>,
})

const apps = loadable(() => import('../../pages/Apps'), {
  fallback: <LoadingPage/>,
})

const projectDetail = loadable(() => import('../../pages/ProjectDetail'), {
  fallback: <LoadingPage/>,
})

const TimeSheet = loadable(() => import('../../pages/TimeSheet/TimeSheet'), {
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
  {
    path: '/project/:projectId',
    exact: true,
    component: projectDetail,
    layout: DashboardLayout,
    requiredAuth: true
  },

  {
    path: '/time-sheets',
    exact: true,
    component: TimeSheet,
    layout: DashboardLayout,
    requiredAuth: true
  },
]
