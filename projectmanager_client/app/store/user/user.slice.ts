import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: [],
  error: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startUser: state => {
      state.isLoading = true
      state.isSuccess = false
    },
    userSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      if (action.payload) {
        state.data = action.payload
      }
    },
    userFail: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.error = action.payload
    },
    resetUser: () => {
      return initialState
    },
  },
})

export const { startUser, userSuccess, userFail, resetUser } = userSlice.actions

export const { reducer: userReducer } = userSlice
