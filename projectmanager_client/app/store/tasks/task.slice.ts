import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: undefined,
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

export const { startTask, taskSuccess, taskFail, resetTask } = TaskSlice.actions

export const { reducer: TaskReducer } = TaskSlice
