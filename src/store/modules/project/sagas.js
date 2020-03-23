import { reset } from 'redux-form'
import { call, takeLatest, put } from 'redux-saga/effects'
import ProjectRequest from '../../../api/Request/ProjectRequest'
import { error, success } from '../../../utils/toastr'
import { fetchExternalMembersSuccess, requestAssignMembersError, requestAssignMembersSuccess } from './actions'
import { REQUEST_ASSIGN_MEMBERS, FETCH_EXTERNAL_MEMBERS } from './constants'

function* fetchExternalMembers(action) {
  try {
    const { data } = yield call(ProjectRequest.fetchExternalMembers.bind(ProjectRequest), action.project.id)
    yield put(fetchExternalMembersSuccess(data))
  } catch (e) {
    error('Fetched external members failed!')
  }
}

function* assignMembers(action) {
  const formData = {
    members: action.project.members
  }

  try {
    yield call(ProjectRequest.assignMembers.bind(ProjectRequest), action.project.id, formData)
    const { data } = yield call(ProjectRequest.fetchExternalMembers.bind(ProjectRequest), action.project.id)
    yield put(fetchExternalMembersSuccess(data))
    yield put(reset('AssignMemberForm'))
    yield put(requestAssignMembersSuccess())
    success('Assigned members succeeded!')
  } catch (e) {
    yield put(reset('AssignMemberForm'))
    yield put(requestAssignMembersError())
    error('Request assign members failed!')
  }
}


export default function* projectSaga() {
  yield takeLatest(FETCH_EXTERNAL_MEMBERS, fetchExternalMembers)
  yield takeLatest(REQUEST_ASSIGN_MEMBERS, assignMembers)
}
