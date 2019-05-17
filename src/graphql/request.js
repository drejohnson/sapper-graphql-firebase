export const request = async query => {
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
      }),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
  } catch (err) {
    console.log(err)
  }
}
