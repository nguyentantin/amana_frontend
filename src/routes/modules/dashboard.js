import React from 'react'

import { DashboardLayout } from '../../components/Layout'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'
import AppBuildDetail from '../../pages/AppBuildDetail'

const Dashboard = loadable(() => import('../../pages/Dashboard/Dashboard'), {
  fallback: <LoadingPage/>,
})

const TimeSheet = loadable(() => import('../../pages/TimeSheet/TimeSheet'), {
  fallback: <LoadingPage/>,
})

export default [
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    layout: DashboardLayout,
    requiredAuth: true
  },
  {
    path: '/project/:projectId/app-build/:appBuildId',
    exact: true,
    component: AppBuildDetail,
    layout: DashboardLayout,
    requireAuth: true,
  },
  {
    path: '/time-sheets',
    exact: true,
    component: TimeSheet,
    layout: DashboardLayout,
    requiredAuth: true
  },
]
