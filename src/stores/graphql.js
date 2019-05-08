import { writable } from 'svelte/store'
import { request } from '../graphql/request'

export const createQuery = () => {
  const { subscribe, set } = writable({})

  return {
    subscribe,
    useQuery: async (query, variable) => {
      const { data } = await request(query, variable)
      set(data)
    },
  }
}

export const store = createQuery()
