export const ARTICLES_QUERY = /* GraphQL */ `
  query {
    articles: article {
      id
      image
      title
    }
  }
`
