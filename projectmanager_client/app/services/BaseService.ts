import RestClient, { createRestClient } from './RestClient'
import { Params } from '@feathersjs/feathers'

export default class BaseService {
  instance = RestClient

  constructor(endpoint?: string) {
    if (endpoint) {
      this.instance = createRestClient(endpoint)
    }
  }

  public get<T>(url: string, query?: object, options?: any): Promise<T> {
    return this.instance.service(url).find({ ...options, query })
  }

  public post<T>(
    url: string,
    body?: object | string,
    config?: Params,
  ): Promise<T> {
    return this.instance.service(url).create(body || {}, config)
  }

  public put<T>(url: string, body?: object, config?: Params): Promise<T> {
    return this.instance.service(url).update(null, body, config)
  }

  public delete<T>(
    url: string,
    id?: string | number,
    options?: any,
  ): Promise<T> {
    return this.instance.service(url).remove(id || '', options)
  }
}
