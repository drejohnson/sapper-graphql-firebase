import { writable } from 'svelte/store'
import { request } from '../graphql/request'

export const createQuery = () => {
  const { subscribe, set } = writable({})

  return {
    subscribe,
    useQuery: async query => {
      const { data } = await request(query)
      set(data)
    },
  }
}

export const store = createQuery()
