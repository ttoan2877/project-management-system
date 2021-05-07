import { createAction } from '@reduxjs/toolkit'
import {
  ChangeStatusRequest,
  SubtaskRequest,
  TaskRequest,
} from 'models/api/task'

export const createTask = createAction<TaskRequest>('CREATE_TASK')

export const updateTask = createAction<TaskRequest>('UPDATE_TASK')

export const fetchTask = createAction<number>('FETCH_TASK')

export const changeStatus = createAction<ChangeStatusRequest>('CHANGE_STATUS')

export const createSubtask = createAction<SubtaskRequest>('CREATE_SUBTASK')

export const updateSubtask = createAction<SubtaskRequest>('UPDATE_SUBTASK')
