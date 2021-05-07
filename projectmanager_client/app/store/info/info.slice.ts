import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isSuccess: false,
  error: undefined,
}

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    startInfo: state => {
      state.isLoading = true
      state.isSuccess = false
    },
    infoSuccess: state => {
      state.isLoading = false
      state.isSuccess = true
    },
    infoFail: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.error = action.payload
    },
    resetInfo: () => {
      return initialState
    },
  },
})

export const { startInfo, infoSuccess, infoFail, resetInfo } = infoSlice.actions

export const { reducer: infoReducer } = infoSlice
