import { get, readable } from 'svelte/store'
import transformRequest from '../utils/transformRequest'

export default function setRequest(query, opts = {}) {
  let request = transformRequest(query, opts)

  const prev = readable(request)

  let current = get(prev)

  if (current !== undefined && current.key === request.key) {
    return current
  } else {
    current = request
    return request
  }
}
