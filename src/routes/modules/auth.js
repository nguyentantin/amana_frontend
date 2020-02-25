import React from 'react'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'


const PageNotFound = loadable(() => import('../../pages/PageNotFound'), {
  fallback: <LoadingPage/>,
})

export default [
  {path: '/login', component: PageNotFound},
  {path: '/send-email-reset', component: PageNotFound},
  {path: '/reset-password', component: PageNotFound},
]
