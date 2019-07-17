<script>
  import { lazyload } from '../actions/lazyload'
  export let posts
</script>

<div>
  {#if posts.data}
    {#each posts.data.articles as article}
      <h1>{article.title}</h1>
      <!-- for lazyloading to work src image needs to be low quality and should be about 3px by 3px -->
      <!-- data-src holds the high quality image -->
      <img
        use:lazyload
        src={article.image}
        data-src={article.image}
        alt={article.title}
        style="width: 100%; object-fit: contain; object-position: center top" />
    {/each}
  {:else}
    <div>loading...</div>
  {/if}
</div>
