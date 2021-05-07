export interface ProjectRequest {
  ID?: number
  name: string
  description: string
}

export interface ProjectUserRequest {
  project_id: number
  user_id: number
}

export interface TaskProjectRequest {
  query: string
  project_id: number
  status: number
}

export interface UserTaskProjectRequest {
  query?: string
  project_id: number
  user_id: number
  status?: number
}
