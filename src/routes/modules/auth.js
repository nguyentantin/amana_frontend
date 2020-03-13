import React from 'react'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'
import { GuestLayout } from '../../components/Layout'

const SignInPage = loadable(() => import('../../pages/SignIn'), {
  fallback: <LoadingPage/>,
})

const SignUpPage = loadable(() => import('../../pages/SignUp'), {
  fallback: <LoadingPage/>,
})

const EmailVerify = loadable(() => import('../../pages/EmailVerify/EmailVerify'), {
  fallback: <LoadingPage/>,
})

export default [
  {
    path: '/sign-in',
    component: SignInPage,
    layout: GuestLayout,
    exact: true,
    restricted: true
  },
  {
    path: '/sign-up',
    component: SignUpPage,
    layout: GuestLayout,
    exact: true,
    restricted: true
  },
  {
    path: '/email-verification',
    exact: true,
    component: EmailVerify,
  },
]
