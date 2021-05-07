import { createAction } from '@reduxjs/toolkit'
import { TaskRequest, Status } from 'models/api/task'

export const createTask = createAction<TaskRequest>('CREATE_TASK')

export const updateTask = createAction<TaskRequest>('UPDATE_TASK')

export const fetchTask = createAction<number>('FETCH_TASK')

export const fetchAssignee = createAction<number>('FETCH_ASSIGNEE')

export const assignMember = createAction<number>('ASSIGN_MEMBER')

export const unassignMember = createAction<number>('UNASSIGN_MEMBER')

export const changeStatus = createAction<Status>('CHANGE_STATUS')
