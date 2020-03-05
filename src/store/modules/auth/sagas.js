import { call, takeLatest, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { error, success } from '../../../utils/toastr'
import { REQUEST_LOGIN, REQUEST_REGISTER } from './constants'
import { loginSuccess } from './actions'
import AuthRequest from '../../../api/Request/AuthRequest'

function* login(payload) {
  try {
    const username = yield call(AuthRequest.login(payload.credentials))
    yield put(loginSuccess(username))
    yield put(push('/dashboard'))
    success('Login is successfully!')
  } catch (err) {
    error('Login is failed!')
  }
}

function* register(payload) {
  try {
    yield call(AuthRequest.register(payload.user))
    yield put(push('/login'))
    success('Register is successfully!')
  } catch (err) {
    error('Register is failed!')
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* authSagas() {
  yield takeLatest(REQUEST_LOGIN, login)
  yield takeLatest(REQUEST_REGISTER, register)
}

