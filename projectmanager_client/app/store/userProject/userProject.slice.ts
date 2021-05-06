import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: [],
  error: undefined,
}

const userProjectSlice = createSlice({
  name: 'userProject',
  initialState,
  reducers: {
    startUserProject: state => {
      state.isLoading = true
      state.isSuccess = false
    },
    userProjectSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      if (action.payload) {
        state.data = action.payload
      }
    },
    userProjectFail: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.error = action.payload
    },
    resetUserProject: () => {
      return initialState
    },
  },
})

export const {
  startUserProject,
  userProjectSuccess,
  userProjectFail,
  resetUserProject,
} = userProjectSlice.actions

export const { reducer: userProjectReducer } = userProjectSlice
