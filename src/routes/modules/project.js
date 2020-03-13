import React from 'react'
import { DashboardLayout } from '../../components/Layout'
import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const projectDetail = loadable(() => import('../../pages/ProjectDetail'), {
  fallback: <LoadingPage/>,
})

export default [
  {
    path: '/project/:projectId',
    exact: true,
    component: projectDetail,
    layout: DashboardLayout,
    requiredAuth: true
  }
]
