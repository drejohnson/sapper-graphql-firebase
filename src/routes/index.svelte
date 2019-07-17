<script context="module">
  import { get } from 'svelte/store'
  import client from '../graphql/client'
  import { ARTICLES_QUERY } from '../graphql/queries/article'

  export async function preload() {
    const posts = await client.query(ARTICLES_QUERY)
    return {
      posts,
    }
  }
</script>

<script>
  import Post from '../components/Post.svelte'
  import Login from '../components/Login.svelte'

  export let posts
</script>

<svelte:head>
  <title>{process.env.APP_NAME}</title>
  <meta name="description" content={process.env.APP_DESCRIPTION} />
</svelte:head>

<h1>Home</h1>

<Login />

<Post {posts} />
