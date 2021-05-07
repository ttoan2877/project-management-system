import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: {},
  task: [],
  error: undefined,
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    startProject: state => {
      state.isLoading = true
      state.isSuccess = false
    },
    projectSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      if (action.payload) {
        state.data = action.payload
      }
    },
    projectTaskSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      if (action.payload) {
        state.task = action.payload
      }
    },
    projectFail: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.error = action.payload
    },
    resetProject: () => {
      return initialState
    },
  },
})

export const {
  startProject,
  projectSuccess,
  projectFail,
  projectTaskSuccess,
  resetProject,
} = projectSlice.actions

export const { reducer: projectReducer } = projectSlice
