import produce from 'immer'
import {
  FETCH_EXTERNAL_MEMBERS,
  FETCH_EXTERNAL_MEMBERS_SUCCESS,
} from './constants'

const initialState = {
  externalMembers: [],
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_EXTERNAL_MEMBERS:
        break
      case FETCH_EXTERNAL_MEMBERS_SUCCESS:
        draft.externalMembers = action.data
        break
      default:
        return state
    }
  })

export default reducer
