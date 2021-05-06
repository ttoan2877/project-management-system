import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: [],
  error: undefined,
}

const userProjectTaskSlice = createSlice({
  name: 'userProjectTask',
  initialState,
  reducers: {
    startUserProjectTask: state => {
      state.isLoading = true
      state.isSuccess = false
    },
    userProjectTaskSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      if (action.payload) {
        state.data = action.payload
      }
    },
    userProjectTaskFail: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.error = action.payload
    },
    resetUserProjectTask: () => {
      return initialState
    },
  },
})

export const {
  startUserProjectTask,
  userProjectTaskSuccess,
  userProjectTaskFail,
  resetUserProjectTask,
} = userProjectTaskSlice.actions

export const { reducer: userProjectTaskReducer } = userProjectTaskSlice
