import { get } from 'lodash'
import { getAuthData } from 'store/auth/selectors'
import { createDeepEqualSelector } from 'store/selectorUtils'

export const getProjectState = (state: any) => state.project
export const getProjectData = (state: any) => get(state, 'project.data', {})
export const getProjectTask = (state: any) => get(state, 'project.task', [])
export const getProjectMember = (state: any) => get(state, 'project.member', [])

export const getMyTask = createDeepEqualSelector(
  getAuthData,
  getProjectTask,
  ({ ID }, tasks) => {
    return tasks.filter((task: any) => {
      const users = get(task, 'users')
      if (!users) return false
      return get(task, 'users').some((user: any) => get(user, 'ID') === ID)
    })
  },
)
