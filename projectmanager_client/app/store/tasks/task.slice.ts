import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: {},
  assignee: [],
  error: undefined,
}

const TaskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    startTask: state => {
      state.isLoading = true
      state.isSuccess = false
    },
    taskSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      if (action.payload) {
        state.data = action.payload
      }
    },
    taskAssigneeSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      if (action.payload) {
        state.assignee = action.payload
      }
    },
    taskFail: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.error = action.payload
    },
    resetTask: () => {
      return initialState
    },
  },
})

export const {
  startTask,
  taskSuccess,
  taskFail,
  resetTask,
  taskAssigneeSuccess,
} = TaskSlice.actions

export const { reducer: TaskReducer } = TaskSlice
