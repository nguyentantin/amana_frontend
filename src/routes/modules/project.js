import React from 'react'
import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'
import { DashboardLayout } from '../../components/Layout'

const ProjectDetail = loadable(() => import('../../pages/ProjectDetail'), {
  fallback: <LoadingPage/>
})

const CloneProject = loadable(() => import('../../pages/CloneProject'), {
  fallback: <LoadingPage/>
})

export default [
  {
    path: '/project/:projectId',
    exact: true,
    component: ProjectDetail,
    layout: DashboardLayout,
    requiredAuth: true
  },
  {
    path: '/project/:projectId/clone',
    exact: true,
    component: CloneProject,
    requiredAuth: true
  }
]
