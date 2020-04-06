import { makeActionCreator } from '../../../store'
import {
  FETCH_APP_BUILDS,
  FETCH_APP_BUILDS_SUCCESS,
  FETCH_MORE_APP_BUILDS,
  FETCH_MORE_APP_BUILDS_SUCCESS,
  FETCH_PROJECT,
  FETCH_PROJECT_SUCCESS,
} from './constants'

export const fetchProject = makeActionCreator(FETCH_PROJECT, 'params')
export const fetchProjectSuccess = makeActionCreator(FETCH_PROJECT_SUCCESS, 'data')
export const fetchAppBuilds = makeActionCreator(FETCH_APP_BUILDS, 'params')
export const fetchAppBuildsSuccess = makeActionCreator(FETCH_APP_BUILDS_SUCCESS, 'data')
export const fetchMoreAppBuilds = makeActionCreator(FETCH_MORE_APP_BUILDS, 'params')
export const fetchMoreAppBuildsSuccess = makeActionCreator(FETCH_MORE_APP_BUILDS_SUCCESS, 'data')
