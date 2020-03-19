import React from 'react'
import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'
import { DashboardLayout } from '../../components/Layout'

const ProjectDetail = loadable(() => import('../../pages/ProjectDetail'), {
  fallback: <LoadingPage/>
})

export default [
  {
    path: '/projects/:projectId',
    exact: true,
    component: ProjectDetail,
    layout: DashboardLayout,
    requiredAuth: true
  }
]
