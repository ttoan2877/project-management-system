import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: {},
  error: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuth: state => {
      state.isLoading = true
      state.isSuccess = false
    },
    authSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.data = action.payload
    },
    authFail: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.error = action.payload
    },
    resetAuth: () => {
      return initialState
    },
  },
})

export const { startAuth, authSuccess, authFail, resetAuth } = authSlice.actions

export const { reducer: authReducer } = authSlice
