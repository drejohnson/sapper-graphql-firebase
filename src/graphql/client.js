import createClient from '../svql/createClient'

const client = createClient({
  url: process.env.GRAPHQL_ENDPOINT,
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_ACCESS_KEY,
  },
})

export default client
