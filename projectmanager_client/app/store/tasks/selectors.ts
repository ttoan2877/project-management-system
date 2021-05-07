import { get } from 'lodash'

export const getTaskState = (state: any) => state.task
export const getTaskData = (state: any) => get(state, 'task.data', [])
