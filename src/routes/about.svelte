<script context="module">
  import { store } from '../stores/graphql'

  export async function preload() {
    return { store }
  }
</script>

<script>
  import Featured from '../components/Featured.svelte'
  import LazyImg from '../components/LazyImg.svelte'
  import { FEATURED_QUERY } from '../graphql/queries/featured'
  store.useQuery(FEATURED_QUERY)
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>About</h1>
<Featured data={$store} />