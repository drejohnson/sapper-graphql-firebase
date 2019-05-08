<script>
  import LazyImg from '../components/LazyImg.svelte'
  export let data
</script>

<div>
  {#if data.episode}
  {#each data.episode as episode}
  <h1>{episode.title}</h1>
  <LazyImg
    imgSrc="{`${process.env.CLOUDINARY_URL}/${process.env.COVER_TRANSFORM_PREVIEW}/${episode.cover}`}"
    dataSrc="{`${process.env.CLOUDINARY_URL}/${process.env.COVER_TRANSFORM}/${episode.cover}`}"
    imgAlt="Lazy City"
  />
  {/each}
  {:else}
  <div>loading...</div>
  {/if}
</div>
