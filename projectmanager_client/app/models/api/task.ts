export interface TaskRequest {
  ID?: number
  name: string
  description: string
  deadline: string
  project_id?: number
}

export interface AssignRequest {
  task_id: number
  user_id: number
}

export interface UserTaskRequest {
  query: string
  task_id: number
}

export interface SubtaskRequest {
  ID?: number
  task_id?: number
  is_done?: boolean
  description: string
}

export interface ChangeStatusRequest {
  task_id: number
  status: number
}
