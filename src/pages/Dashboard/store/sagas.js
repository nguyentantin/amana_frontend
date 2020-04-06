import { call, takeLatest, put } from 'redux-saga/effects'
import ProjectRequest from '../../../api/Request/ProjectRequest'
import { FETCH_APP_BUILDS, FETCH_MORE_APP_BUILDS, FETCH_PROJECT } from './constants'
import { fetchAppBuildsSuccess, fetchMoreAppBuildsSuccess, fetchProjectSuccess } from './actions'
import AppBuildRequest from '../../../api/Request/AppBuildRequest'
import { error } from '../../../utils/toastr'

function* fetchProject (action) {
  try {
    const data = yield call(ProjectRequest.all.bind(ProjectRequest), action.params)
    yield put(fetchProjectSuccess(data))
  } catch (err) {
    error('Can not get list project')
  }
}

function* fetchAppBuilds (action) {
  try {
    const { data } = yield call(AppBuildRequest.all.bind(AppBuildRequest), action.params)
    yield put(fetchAppBuildsSuccess(data))
  } catch (err) {
    error('Can not get list app builds')
  }
}

function* fetchMoreAppBuild (action) {
  try {
    const { data } = yield call(AppBuildRequest.all.bind(AppBuildRequest), action.params)
    yield put(fetchMoreAppBuildsSuccess(data))
  } catch (err) {
    error('Can not get list app builds')
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* dashboardSagas() {
  yield takeLatest(FETCH_PROJECT, fetchProject)
  yield takeLatest(FETCH_APP_BUILDS, fetchAppBuilds)
  yield takeLatest(FETCH_MORE_APP_BUILDS, fetchMoreAppBuild)
}
