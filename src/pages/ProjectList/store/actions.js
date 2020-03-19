import { makeActionCreator } from '../../../store'
import { CREATE_PROJECT, CREATE_PROJECT_SUCCESS, FETCH_PROJECT, FETCH_PROJECT_SUCCESS } from './constants'

export const createProject = makeActionCreator( CREATE_PROJECT, 'data')
export const createProjectSuccess = makeActionCreator(CREATE_PROJECT_SUCCESS, 'data')
export const fetchProject = makeActionCreator(FETCH_PROJECT, 'params')
export const fetchProjectSuccess = makeActionCreator(FETCH_PROJECT_SUCCESS, 'data')



