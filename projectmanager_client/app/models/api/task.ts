export enum Status {
  TODO = 1,
  DOING = 2,
  DONE = 3,
  CLOSED = 4,
}
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
