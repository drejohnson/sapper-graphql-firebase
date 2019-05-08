<script>
  export let segment
</script>

<header>
  <div class="logo">
    <a rel="prefetch" href="/">
      <img src="logo.svg" alt="logo" />
    </a>
  </div>
  <nav>
    <ul>
      <li>
        <a class='{segment === undefined ? "selected" : ""}' href=".">home</a>
      </li>
      <li>
        <a class='{segment === "about" ? "selected" : ""}' href="about"
          >about</a
        >
      </li>

      <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
					the blog data when we hover over the link or tap it on a touchscreen -->
      <li>
        <a
          rel="prefetch"
          class='{segment === "blog" ? "selected" : ""}'
          href="blog"
          >blog</a
        >
      </li>
    </ul>
  </nav>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    height: 5rem;
    border-bottom: 1px solid rgba(170, 30, 30, 0.1);
    padding: 0 1em;
  }
  nav {
    font-weight: 300;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(170, 30, 30);
    display: block;
    bottom: -1px;
  }

  li > a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  .logo {
    display: flex;
  }

  .logo a {
    display: block;
    height: 42px;
  }

  @media (min-width: 768px) {
    .logo a {
      display: block;
      height: 52px;
    }
  }
</style>
