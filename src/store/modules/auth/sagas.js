import { call, takeLatest } from 'redux-saga/effects'

import { REQUEST_LOGIN } from './constants'
import AuthRequest from '../../../api/Request/AuthRequest'

function* login() {
  try {
    // Call our request helper (see 'utils/request')
    const username = yield call(AuthRequest.login({}))
  } catch (err) {
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(REQUEST_LOGIN, login)
}
