import { createAction } from '@reduxjs/toolkit'
import { UserRequest } from 'models/api/user'

export const updateInfo = createAction<UserRequest>('UPDATE_INFO')
