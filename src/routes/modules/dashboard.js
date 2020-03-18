import React from 'react'

import { DashboardLayout } from '../../components/Layout'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const Dashboard = loadable(() => import('../../pages/Dashboard/Dashboard'), {
  fallback: <LoadingPage/>,
})

const Apps = loadable(() => import('../../pages/Apps'), {
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
    path: '/apps',
    exact: true,
    component: Apps,
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
