import React from 'react'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'


const PageNotFound = loadable(() => import('../../pages/SignIn'), {
  fallback: <LoadingPage/>,
})

export default [
  {
    path: 'auth/sign-in',
    component: PageNotFound,
    exact: true,
  },
  {
    path: 'auth/sign-up',
    component: PageNotFound,
    exact: true
  },
]
