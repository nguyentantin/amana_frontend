import React from 'react'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const PageNotFound = loadable(() => import('../../pages/PageNotFound'), {
  fallback: <LoadingPage/>,
})

const ContactPage = loadable(() => import('../../pages/ContactPage'), {
  fallback: <LoadingPage/>,
})

export default [
  {path: '/projects', component: ContactPage},
  {path: '/projects/create', component: PageNotFound},
  {path: '/projects/:projectId', component: PageNotFound},
]
