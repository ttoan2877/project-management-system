import { get } from 'lodash'
import { createDeepEqualSelector } from 'store/selectorUtils'
import { getProjectMember } from 'store/project/selectors'

export const getTaskState = (state: any) => state.task
export const getTaskData = (state: any) => get(state, 'task.data', [])

export const getMemberToAssign = createDeepEqualSelector(
  getProjectMember,
  getTaskData,
  (members, { users: assignee }) => {
    return members.filter((m: any) => !assignee.find((a: any) => a.ID === m.id))
  },
)
