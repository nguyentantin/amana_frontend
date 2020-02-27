import React from 'react'

import { GuestLayout } from '../../components/Layout'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const HomePage = loadable(() => import('../../pages/Home/HomePage'), {
  fallback: <LoadingPage/>,
})

export default [
  {path: '/', exact: true, component: HomePage, layout: GuestLayout},
]