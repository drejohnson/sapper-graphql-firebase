import fnv1a from '@sindresorhus/fnv1a'

function generateKey(key) {
  return fnv1a(JSON.stringify(key)).toString(36)
}

function getRequestKey(query, opts = {}) {
  const queryKey = generateKey(query)
  if (opts.variables === undefined || opts.variables === null) {
    return queryKey
  }
  return fnv1a('' + queryKey + JSON.stringify(opts.variables))
}

export default function transformRequest(query, opts) {
  return {
    key: getRequestKey(query, opts.v),
    query,
    variables: opts.variables || {},
  }
}
