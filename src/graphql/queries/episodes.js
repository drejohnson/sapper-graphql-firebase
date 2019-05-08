export const episode = `
  episode(
    order_by: {created_at: desc}
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
`
