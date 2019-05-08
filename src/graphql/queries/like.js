export const LIKE_MUTATION = `
  mutation Like($id: String!) {
    update_episode(
      _inc: { like_count: 1 }
      where: { id: { _eq: $id } }
    ) {
      returning {
        like_count
      }
    }
  }
`

export const DISLIKE_MUTATION = `
  mutation DisLike($id: String!) {
    update_episode(
      _inc: { like_count: 1 }
      where: { id: { _eq: $id } }
    ) {
      returning {
        like_count
      }
    }
  }
`
