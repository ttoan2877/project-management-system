import { Action } from 'redux'

export interface ITask<T> {
  payload: T
}
export default interface TaskAction<T> extends Action, ITask<T> {
  type: string
}

export type ActionCallback<T> = T & {
  callback?: (_?: any) => void
}
