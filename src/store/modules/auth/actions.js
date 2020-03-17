import { LOGIN_SUCCESS, REQUEST_LOGIN, REQUEST_REGISTER, REGISTER_SUCCESS, LOGIN_ERROR, REGISTER_ERROR, REQUEST_LOGIN_GOOGLE } from './constants'
import makeActionCreator from '../../makeActionCreator'

export const loginSuccess = makeActionCreator(LOGIN_SUCCESS, 'authInfo')
export const requestLogin = makeActionCreator(REQUEST_LOGIN, 'credentials')
export const requestRegister = makeActionCreator(REQUEST_REGISTER, 'user')
export const registerSuccess = makeActionCreator(REGISTER_SUCCESS)
export const loginError = makeActionCreator(LOGIN_ERROR)
export const registerError = makeActionCreator(REGISTER_ERROR)
export const requestLoginGoogle = makeActionCreator(REQUEST_LOGIN_GOOGLE, 'tokenData')

