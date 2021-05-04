import { createAction } from '@reduxjs/toolkit'
import { ProjectRequest } from 'models/api/project'

export const createProject = createAction<ProjectRequest>('CREATE_PROJECT')

export const updateProject = createAction<ProjectRequest>('UPDATE_PROJECT')

export const fetchProject = createAction<number>('FETCH_PROJECT')
