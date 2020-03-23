import produce from 'immer'
import {
  FETCH_EXTERNAL_MEMBERS,
  FETCH_EXTERNAL_MEMBERS_SUCCESS, REQUEST_ASSIGN_MEMBERS, REQUEST_ASSIGN_MEMBERS_ERROR, REQUEST_ASSIGN_MEMBERS_SUCCESS,
} from './constants'

const initialState = {
  externalMembers: [],
  assignMembersLoading: false,
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_EXTERNAL_MEMBERS:
        break
      case FETCH_EXTERNAL_MEMBERS_SUCCESS:
        draft.externalMembers = action.data
        break
      case REQUEST_ASSIGN_MEMBERS:
        draft.assignMembersLoading = true;
        break;
      case REQUEST_ASSIGN_MEMBERS_SUCCESS:
        draft.assignMembersLoading = false;
        break;
      case REQUEST_ASSIGN_MEMBERS_ERROR:
        draft.assignMembersLoading = false;
        break;
      default:
        return state
    }
  })

export default reducer
