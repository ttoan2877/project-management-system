import { get } from 'lodash'

export const getProjectState = (state: any) => state.project
export const getProjectData = (state: any) => get(state, 'project.data')
