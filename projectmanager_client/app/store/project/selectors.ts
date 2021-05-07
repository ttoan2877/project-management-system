import { get } from 'lodash'

export const getProjectState = (state: any) => state.project
export const getProjectData = (state: any) => get(state, 'project.data', {})
export const getProjectTask = (state: any) => get(state, 'project.task', [])
export const getProjectMember = (state: any) => get(state, 'project.member', [])
