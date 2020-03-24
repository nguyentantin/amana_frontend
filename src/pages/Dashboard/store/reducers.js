import produce from 'immer'
import { FETCH_APP_BUILDS, FETCH_APP_BUILDS_SUCCESS, FETCH_PROJECT, FETCH_PROJECT_SUCCESS } from './constants'

const initialState = {
  projects: [],
  appBuilds: [],
  projectLoading: false,
  appBuildLoading: false
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PROJECT:
        draft.projectLoading = true
        break
      case FETCH_PROJECT_SUCCESS:
        draft.projects = action.data
        draft.projectLoading = false
        break
      case FETCH_APP_BUILDS:
        draft.appBuildLoading = true
        break
      case FETCH_APP_BUILDS_SUCCESS:
        draft.appBuilds = action.data
        draft.appBuildLoading = false
        break
      default:
        return state
    }
  })

export default reducer
