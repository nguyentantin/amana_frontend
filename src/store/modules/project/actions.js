import {makeActionCreator} from '../../index'
import { FETCH_EXTERNAL_MEMBERS, FETCH_EXTERNAL_MEMBERS_SUCCESS, REQUEST_ASSIGN_MEMBERS } from './constants'

export const fetchExternalMembers = makeActionCreator(FETCH_EXTERNAL_MEMBERS, 'project')
export const fetchExternalMembersSuccess = makeActionCreator(FETCH_EXTERNAL_MEMBERS_SUCCESS, 'data')
export const requestAssignMembers = makeActionCreator(REQUEST_ASSIGN_MEMBERS, 'project')
