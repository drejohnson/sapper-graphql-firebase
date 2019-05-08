<script>
  export let imgSrc
  export let dataSrc
  export let imgAlt = ''

  function lazyload(node) {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }
    let fetchImage = url => {
      return new Promise((resolve, reject) => {
        let image = new Image()
        image.src = url
        image.onload = resolve
        image.onerror = reject
      })
    }
    let loadImage = image => {
      let src = image.dataset.src
      fetchImage(src).then(() => {
        image.src = src
      })
    }
    let handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target)
        }
      })
    }

    let io = new IntersectionObserver(handleIntersection, options)

    io.observe(node)

    return {
      destroy() {
        io.unobserve(node)
      },
    }
  }
</script>

<img
  use:lazyload
  src="{imgSrc}"
  data-src="{dataSrc}"
  alt="{imgAlt}"
  class="lazy-image"
/>

<style>
  .lazy-image {
    width: 300px;
  }
</style>
