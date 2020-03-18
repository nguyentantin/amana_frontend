import ProjectRequest from '../../../api/Request/ProjectRequest'
import { error, success } from '../../../utils/toastr'
import { fetchExternalMembersSuccess } from './actions'
import { call, takeLatest, put } from 'redux-saga/effects'
import { REQUEST_ASSIGN_MEMBERS, FETCH_EXTERNAL_MEMBERS } from './constants'

function* fetchExternalMembers(action) {
  try {
    const { data } = yield call(ProjectRequest.fetchExternalMembers.bind(ProjectRequest), action.project.id)
    yield put(fetchExternalMembersSuccess(data))
  } catch (e) {
    console.log(e)
    error('Fetched external members failed!')
  }
}

function* assignMembers(action) {
  try {
    yield call(ProjectRequest.assignMembers.bind(ProjectRequest), action.data)
    success('Assigned members succeeded!')
  } catch (e) {
    error('Request assign members failed!')
  }
}


export default function* projectSaga() {
  yield takeLatest(FETCH_EXTERNAL_MEMBERS, fetchExternalMembers)
  yield takeLatest(REQUEST_ASSIGN_MEMBERS, assignMembers)
}
