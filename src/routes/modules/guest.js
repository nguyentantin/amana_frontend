import React from 'react'

import { GuestLayout } from '../../components/Layout'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const HomePage = loadable(() => import('../../pages/Home/HomePage'), {
  fallback: <LoadingPage/>,
})

const dashboard = loadable(() => import('../../pages/Dashboard'), {
  fallback: <LoadingPage/>,
})

const apps = loadable(() => import('../../pages/Apps'), {
  fallback: <LoadingPage/>,
})

export default [
  {
    path: '/',
    exact: true,
    component: HomePage,
    layout: GuestLayout,
  },
  {
    path: '/dashboard',
    exact: true,
    component: dashboard,
    layout: GuestLayout,
    requiredAuth: true
  },
  {
    path: '/apps',
    exact: true,
    component: apps,
    layout: GuestLayout,
    requiredAuth: true
  },
]
