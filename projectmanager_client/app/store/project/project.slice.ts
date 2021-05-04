import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: undefined,
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
  resetProject,
} = projectSlice.actions

export const { reducer: projectReducer } = projectSlice
