import { get } from 'lodash'
import { createDeepEqualSelector } from 'store/selectorUtils'
import { getProjectData } from 'store/project/selectors'

export const getUserState = (state: any) => state.user
export const getUserData = (state: any) => get(state, 'user.data', [])

export const getUserToAdd = createDeepEqualSelector(
  getUserData,
  getProjectData,
  (users, { user_role: member }) => {
    return users.filter((x: any) => !member.some((m: any) => m.id === x.ID))
  },
)
