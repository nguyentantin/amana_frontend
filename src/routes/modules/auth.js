import React from 'react'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'
import { DashboardLayout, GuestLayout } from '../../components/Layout'

const SignInPage = loadable(() => import('../../pages/SignIn/SignIn'), {
  fallback: <LoadingPage/>,
})

const SignUpPage = loadable(() => import('../../pages/SignUp/SignUp'), {
  fallback: <LoadingPage/>,
})

const EmailVerify = loadable(() => import('../../pages/EmailVerify/EmailVerify'), {
  fallback: <LoadingPage/>,
})

const SignUpSuccess = loadable(() => import('../../pages/SignUpSuccess/SignUpSuccess'), {
  fallback: <LoadingPage/>,
})

const PasswordSendMail = loadable(() => import('../../pages/PasswordSendMail/PasswordSendMail'), {
  fallback: <LoadingPage/>,
})

const PasswordReset = loadable(() => import('../../pages/PasswordReset/PasswordReset'), {
  fallback: <LoadingPage/>,
})

const Profile = loadable(() => import('../../pages/Profile/Profile'), {
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
    path: '/pwd/send-mail',
    component: PasswordSendMail,
    exact: true,
    restricted: true
  },
  {
    path: '/pwd/reset',
    component: PasswordReset,
    exact: true,
    restricted: true
  },
  {
    path: '/sign-up-success',
    component: SignUpSuccess,
    layout: GuestLayout,
    exact: true,
    restricted: true
  },
  {
    path: '/email-verification',
    exact: true,
    component: EmailVerify,
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
    layout: DashboardLayout,
    requiredAuth: true
  },
]
