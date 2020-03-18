import React from 'react'

import { DashboardLayout } from '../../components/Layout'
import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const ProjectList = loadable(() => import('../../pages/ProjectList/ProjectList'), {
  fallback: <LoadingPage/>,
})

export default [
  {
    path: '/projects',
    exact: true,
    component: ProjectList,
    layout: DashboardLayout,
    requiredAuth: true
  },
]
