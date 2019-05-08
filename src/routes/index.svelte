<script context="module">
  import { store } from '../stores/graphql'

  export async function preload() {
    return { store }
  }
</script>

<script>
  import { onMount } from 'svelte'
  import Featured from '../components/Featured.svelte'
  import LazyImg from '../components/LazyImg.svelte'
  import { FEATURED_QUERY } from '../graphql/queries/featured'

  let LoginComponent
  onMount(async () => {
    const login = await import('../components/Login.svelte')
    LoginComponent = login.default
  })

  store.useQuery(FEATURED_QUERY)
</script>

<svelte:head>
  <title>{process.env.APP_NAME}</title>
  <meta name="description" content={process.env.APP_DESCRIPTION}>
</svelte:head>

<h1>Home</h1>

<svelte:component this="{LoginComponent}" />

<Featured data={$store} />