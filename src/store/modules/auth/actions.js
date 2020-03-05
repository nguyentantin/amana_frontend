import { LOGIN_SUCCESS, REQUEST_LOGIN, REQUEST_REGISTER, REGISTER_SUCCESS } from './constants'
import makeActionCreator from '../../makeActionCreator'

export const loginSuccess = makeActionCreator(LOGIN_SUCCESS, 'authInfo')
export const requestLogin = makeActionCreator(REQUEST_LOGIN, 'credentials')
export const requestRegister = makeActionCreator(REQUEST_REGISTER, 'user')
export const registerSuccess = makeActionCreator(REGISTER_SUCCESS)
