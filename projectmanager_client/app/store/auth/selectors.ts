import { get } from 'lodash'

export const getAuthState = (state: any) => state.auth
export const getAuthData = (state: any) => get(state, 'auth.data', {})
export const tokenGetter = (state: any) => get(state, 'auth.data.token')
