// import { of } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'
import { switchMap, catchError } from 'rxjs/operators'

import { extractFiles } from 'extract-files'
import fnv1a from '@sindresorhus/fnv1a'
import setRequest from './stores/request'

export default function createClient(opts) {
  const { url } = opts
  const cache = new Map()

  function handleResult({ fetchError, httpError, graphQLErrors, data }) {
    const error = !!(
      (graphQLErrors && graphQLErrors.length > 0) ||
      fetchError ||
      httpError
    )

    return {
      error,
      fetchError,
      httpError,
      graphQLErrors,
      data,
    }
  }

  function getFetchOptions(operation) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        ...opts.headers,
      },
      ...opts.fetchOptions,
    }

    const { clone, files } = extractFiles(operation)
    const operationJSON = JSON.stringify(clone)

    if (files.size) {
      // See the GraphQL multipart request spec:
      // https://github.com/jaydenseric/graphql-multipart-request-spec

      const form = new FormData()

      form.append('operations', operationJSON)

      const map = {}
      let i = 0
      files.forEach(paths => {
        map[++i] = paths
      })
      form.append('map', JSON.stringify(map))

      i = 0
      files.forEach((paths, file) => {
        form.append(`${++i}`, file, file.name)
      })

      fetchOptions.body = form
    } else {
      fetchOptions.headers['Content-Type'] = 'application/json'
      fetchOptions.body = operationJSON
    }

    return fetchOptions
  }

  function getCacheKey(operation) {
    const { key } = operation
    const cacheKey = fnv1a(
      '' + url + JSON.stringify(getFetchOptions(operation) + key),
    )
    return cacheKey
  }

  function createRequestOperation(type, query, opts = {}) {
    const q = query
      .trim()
      .replace(/^(query|mutation|subscription)\s*/, '')
      .trim()
      .replace(/\s+/g, ' ')
    const requestOperation = setRequest(q, opts)
    return {
      key: opts.key,
      query,
      ...requestOperation,
      operationName: (opts.operationName = type),
    }
  }

  async function query(query, opts = {}) {
    const operation = createRequestOperation('query', query, opts)
    const cacheKey = getCacheKey(operation)
    const response = await request(operation.query, { cacheKey, ...operation })
    return response.toPromise()
  }

  async function request(query, opts = {}) {
    const operation = {
      query,
      opts,
    }
    return fromFetch(url, getFetchOptions(operation)).pipe(
      switchMap(async response => {
        if (!response.ok) {
          const body = await response.text()
          const { status, statusText } = body
          return handleResult({
            httpError: {
              status,
              statusText,
              body,
            },
          })
        } else {
          // OK return data
          const result = await response.json()
          const { errors, data } = result
          return handleResult({
            graphQLErrors: errors,
            data,
          })
        }
      }),
      catchError(error => {
        console.log(error.message)
        return handleResult({
          fetchError: error,
        })
      }),
    )
  }

  return { request, query }
}
