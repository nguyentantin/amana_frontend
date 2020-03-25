import React from 'react'

import { DashboardLayout } from '../../components/Layout'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const Dashboard = loadable(() => import('../../pages/Dashboard/Dashboard'), {
  fallback: <LoadingPage/>,
})

const TimeSheet = loadable(() => import('../../pages/TimeSheet/TimeSheet'), {
  fallback: <LoadingPage/>,
})

const Profile = loadable(() => import('../../pages/Profile/Profile'), {
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
    path: '/time-sheets',
    exact: true,
    component: TimeSheet,
    layout: DashboardLayout,
    requiredAuth: true
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
    layout: DashboardLayout,
    requiredAuth: true
  },
]
