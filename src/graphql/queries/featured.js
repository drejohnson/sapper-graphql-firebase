export const FEATURED_QUERY = `
  query {
    episode(
      where: { is_featured: { _eq: true } }
      order_by: { created_at: desc }
    ) {
      id
      uid
      title
      cover
      season
      episode_number
      show {
        title
      }
    }
  }
`
