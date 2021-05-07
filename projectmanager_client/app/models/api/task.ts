export enum Status {
  TODO = 1,
  DOING = 2,
  DONE = 3,
  CLOSED = 5,
}

export const statusArr = [1, 2, 3, 5]
export interface TaskRequest {
  ID?: number
  name: string
  description: string
  project_id?: number
}

export interface AssignRequest {
  task_id: number
  user_id: number
}

export interface ChangeStatusRequest {
  task_id: number
  status: Status
}
