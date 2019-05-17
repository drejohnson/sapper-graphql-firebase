<script context="module">
  import { store } from '../stores/graphql'

  export async function preload() {
    return { store }
  }
</script>

<script>
  // import { FEATURED_QUERY } from '../graphql/queries/featured'
  // import Featured from '../components/Featured.svelte'
  import Login from '../components/Login.svelte'

  // store.useQuery(FEATURED_QUERY)
</script>

<!--  -->

<svelte:head>
  <title>{process.env.APP_NAME}</title>
  <meta name="description" content={process.env.APP_DESCRIPTION} />
</svelte:head>

<h1>Home</h1>

<Login />
<!-- <Featured data={$store} /> -->
