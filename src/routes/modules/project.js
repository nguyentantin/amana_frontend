import React from 'react'

import { DashboardLayout } from '../../components/Layout'
import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const ProjectList = loadable(() => import('../../pages/ProjectList/ProjectList'), {
  fallback: <LoadingPage/>,
})

const ProjectDetail = loadable(() => import('../../pages/ProjectDetail'), {
  fallback: <LoadingPage/>
})


export default [
  {
    path: '/projects',
    exact: true,
    component: ProjectList,
    layout: DashboardLayout,
    requiredAuth: true
  },
  {
    path: '/projects/:projectId',
    exact: true,
    component: ProjectDetail,
    layout: DashboardLayout,
    requiredAuth: true
  }
]
