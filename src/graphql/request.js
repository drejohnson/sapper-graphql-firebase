export const request = async (query, variables) => {
  const q = query.replace(/\s+/g, ' ')
  const token = process.browser ? localStorage.getItem('token') : null
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {}

  try {
    const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Cache-Control': 'max-age=60',
        'x-hasura-admin-secret': process.env.HASURA_ACCESS_KEY,
        ...authHeader,
      },
      body: JSON.stringify({
        query: q,
        variables,
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return data
  } catch (err) {
    console.log(err)
  }
}
