import feathers, { HookContext } from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import axios from 'axios'
import ApiConfig from 'config/api-config'
import { store } from 'store'
import { tokenGetter } from 'store/auth/selectors'

export const injectTokenHook = async (context: HookContext) => {
  const token = tokenGetter(store.getState())

  if (token) {
    context.params.headers = {
      Authorization: `Bearer ${token}`,
      ...context.params.headers,
      'Content-Type': 'application/json',
    }
  }

  return context
}

export const createRestClient = (endpoint: string = ApiConfig.BASE_URL) => {
  const restClient = feathers()
  const restConfig = rest(endpoint)

  restClient.configure(restConfig.axios(axios))
  restClient.hooks({
    before: {
      all: [injectTokenHook],
    },
  })
  return restClient
}

const RestClient = createRestClient()
export default RestClient
