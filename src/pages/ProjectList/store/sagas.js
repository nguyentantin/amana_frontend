import { call, takeLatest, put } from 'redux-saga/effects'
import ProjectRequest from '../../../api/Request/ProjectRequest'
import { CREATE_PROJECT, FETCH_PROJECT } from './constants'
import { createProjectSuccess, fetchProjectSuccess } from './actions'
import { error, success } from '../../../utils/toastr'

function* createProject (action) {
  try {
    const data = yield call(ProjectRequest.createProject.bind(ProjectRequest), action.data)
    yield put(createProjectSuccess(data))
    success('Create project successfully!')
  } catch (err) {
    error('Can not create project')
  }
}

function* fetchProject (action) {
  try {
    const data = yield call(ProjectRequest.listProject.bind(ProjectRequest))
    yield put(fetchProjectSuccess(data))
  } catch (err) {
    error('Can not get list project')
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* dashboardSagas() {
  yield takeLatest(CREATE_PROJECT, createProject)
  yield takeLatest(FETCH_PROJECT, fetchProject)
}
