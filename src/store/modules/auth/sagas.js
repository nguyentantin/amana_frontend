import { call, takeLatest, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { stopSubmit, reset } from 'redux-form'
import _ from 'lodash'

import { error, success } from '../../../utils/toastr'
import { REQUEST_LOGIN, REQUEST_LOGIN_GOOGLE, REQUEST_REGISTER } from './constants'
import { loginSuccess, loginError, registerError, registerSuccess } from './actions'
import AuthRequest from '../../../api/Request/AuthRequest'
import LocalStorage from '../../../utils/localStorage'
import { HTTP_CODE } from '../../../config/constants'

function* login(action) {
  try {
    const data = yield call(AuthRequest.login.bind(AuthRequest), action.credentials)
    LocalStorage.saveToken(data)
    LocalStorage.saveAuthInfo(data.user)
    yield put(loginSuccess(data))
    yield put(push('/dashboard'))
    success('Login is successfully!')
  } catch (err) {
    yield put(loginError())
    yield put(reset('SignInForm'))
    error('Login is failed!')
  }
}

function* register(action) {
  try {
    yield call(AuthRequest.register.bind(AuthRequest), action.user)
    yield put(push('/sign-up-success'))
    yield put(registerSuccess())
    success('Register is successfully!')
  } catch (err) {
    yield put(registerError())

    if (err.statusCode === HTTP_CODE.UNPROCESSABLE_ENTITY) {
      yield put(stopSubmit('SignUpForm', err.error))
    }
  }
}

function* loginGoogle(action) {
  try {
    const data = yield call(AuthRequest.googleAuthentication.bind(AuthRequest), action.tokenData)
    LocalStorage.saveToken(data)
    LocalStorage.saveAuthInfo(data.user)
    yield put(loginSuccess(data))
    yield put(push('/dashboard'))
    success('Login is successfully!')
  } catch (err) {
    yield put(loginError())
    yield put(reset('SignInForm'))
    const message = _.get(err, 'error.message', 'Login is fail')
    error(message)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* authSagas() {
  yield takeLatest(REQUEST_LOGIN, login)
  yield takeLatest(REQUEST_REGISTER, register)
  yield takeLatest(REQUEST_LOGIN_GOOGLE, loginGoogle)
}

