import produce from 'immer'
import { CREATE_PROJECT, CREATE_PROJECT_SUCCESS, FETCH_PROJECT, FETCH_PROJECT_SUCCESS } from './constants'

const initialState = {
  projects: [],
  listProjects: []
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_PROJECT:
        break
      case CREATE_PROJECT_SUCCESS:
        draft.projects = action.data
        break
      case FETCH_PROJECT:
        break
      case FETCH_PROJECT_SUCCESS:
        draft.listProjects = action.data
        break
      default:
        return state
    }
  })

export default reducer
