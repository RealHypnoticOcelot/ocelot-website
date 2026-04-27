<script>
  let { data } = $props();
  import { formatDate } from '$lib/utils/formatDate.js';
  import NavButtons from '$lib/components/NavButtons.svelte';
  import { page } from '$app/state';
</script>

<style>
  a {
    text-decoration: none;
  }
  .post {
    border: 0.25em var(--color-primary) solid;
    padding: 1em;
    margin: 0.5em 0 0.5em 0;
    text-wrap: auto;
  }
  .post:hover {
    background-color: var(--bg-secondary);
  }
  time {
    color: var(--color-secondary);
  }
  a p {
    color: var(--color-primary);
  }
  header {
    display: grid;
    grid-template-columns: auto min-content;
    align-items: end;
  }
</style>

<main id="content">
  <header>
    <h1>Blog Posts</h1>
  </header>
  <hr>
  <div class="post-container">
  {#each data.posts.data as post}
    <a href="/{post.slug}">
      <div class="post">
        <strong>{post.title ?? "[NO TITLE]"}</strong>
        <em><time datetime={post.updated ?? post.datetime}>{formatDate(post.updated ?? post.datetime, true).YMD}</time></em>
        <br>
        <p>{post.description ?? "[NO DESCRIPTION]"}</p>
      </div>
    </a>
  {/each}
  </div>
  <NavButtons
    route={page.url.pathname}
    isFirstPage={data.posts.isFirstPage}
    isLastPage={data.posts.isLastPage}
    pageNumber={data.pageNumber}
  />
</main>