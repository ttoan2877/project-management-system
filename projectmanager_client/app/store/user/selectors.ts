import { get } from 'lodash'

export const getUserState = (state: any) => state.user
export const getUserData = (state: any) => get(state, 'user.data')
