import { createAction } from '@reduxjs/toolkit'
import { LoginRequest } from 'models/api/login'

export const login = createAction<LoginRequest>('LOGIN')

export const logout = createAction<void>('LOGOUT')

export const reset = createAction<void>('RESET')
