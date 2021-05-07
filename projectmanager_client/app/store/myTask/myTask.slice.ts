import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isSuccess: false,
  data: [],
  error: undefined,
}

const myTaskSlice = createSlice({
  name: 'myTask',
  initialState,
  reducers: {
    startMyTask: state => {
      state.isLoading = true
      state.isSuccess = false
    },
    myTaskSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      if (action.payload) {
        state.data = action.payload
      }
    },
    myTaskFail: (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.error = action.payload
    },
    resetMyTask: () => {
      return initialState
    },
  },
})

export const {
  startMyTask,
  myTaskSuccess,
  myTaskFail,
  resetMyTask,
} = myTaskSlice.actions

export const { reducer: myTaskReducer } = myTaskSlice
