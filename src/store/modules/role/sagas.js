import { call, takeLatest, put } from 'redux-saga/effects'
import { error } from '../../../utils/toastr'
import { FETCH_ROLES } from './constants'
import { fetchRolesSuccess } from './actions'
import RoleRequest from '../../../api/Request/RoleRequest'

function* fetchRole() {
  try {
    const { data } = yield call(RoleRequest.all.bind(RoleRequest))
    yield put(fetchRolesSuccess(data))
  } catch (e) {
    error('Fetched roles failed!')
  }
}

export default function* roleSaga() {
  yield takeLatest(FETCH_ROLES, fetchRole)
}
