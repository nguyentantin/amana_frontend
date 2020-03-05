import produce from 'immer'
import { FETCH_APP_BUILDS, FETCH_APP_BUILDS_SUCCESS, FETCH_PROJECT, FETCH_PROJECT_SUCCESS } from './constants'

const initialState = {
  projects: [],
  appBuilds: [],
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_PROJECT:
        break
      case FETCH_PROJECT_SUCCESS:
        draft.projects = action.data
        break
      case FETCH_APP_BUILDS:
        break
      case FETCH_APP_BUILDS_SUCCESS:
        draft.appBuilds = action.data
        break
      default:
        return state
    }
  })

export default reducer
