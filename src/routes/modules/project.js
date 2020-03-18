import React from 'react'

import { DashboardLayout } from '../../components/Layout'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const projectList = loadable(() => import('../../pages/projects/ProjectList'), {
  fallback: <LoadingPage/>,
})

export default [
  {
    path: '/projects',
    exact: true,
    component: projectList,
    layout: DashboardLayout,
    requiredAuth: true
  },
]
