import produce from 'immer'
import { CREATE_PROJECT, CREATE_PROJECT_SUCCESS } from './constants'

const initialState = {
  projects: [],
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_PROJECT:
        break
      case CREATE_PROJECT_SUCCESS:
        draft.projects = action.data
        console.log('projects', action)
        break
      default:
        return state
    }
  })

export default reducer
