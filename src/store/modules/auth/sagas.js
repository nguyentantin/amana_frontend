import { call, takeLatest } from 'redux-saga/effects'

import { REQUEST_LOGIN } from './constants'
import AuthRequest from '../../../api/Request/AuthRequest'

function* login() {
  try {
    // Call our request helper (see 'utils/request')
    const username = yield call(AuthRequest.login({}))
    console.log(username)
  } catch (err) {
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* authSagas() {
  yield takeLatest(REQUEST_LOGIN, login)
}
