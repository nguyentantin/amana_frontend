import { LOGIN_SUCCESS, REQUEST_LOGIN } from './constants'
import makeActionCreator from '../../makeActionCreator'

export const loginSuccess = makeActionCreator(LOGIN_SUCCESS)
export const requestLogin = makeActionCreator(REQUEST_LOGIN, 'credentials')
