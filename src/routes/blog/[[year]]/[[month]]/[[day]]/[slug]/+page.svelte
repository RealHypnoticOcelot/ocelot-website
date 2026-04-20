<script>
  let { data } = $props();
  import { formatDate } from '$lib/utils/formatDate';
  import { siteAuthor } from '$lib/config.js';
</script>

<style>
  header {
    display: grid;
    grid-template-columns: auto;
    align-items: end;
    text-align: left;
  }
  header > * {
		margin-top: 0.5em;
    margin-bottom: 0;
  }
  time {
    color: var(--color-secondary);
  }
  footer {
    text-align: right;
  }
  .articleBody {
    margin: 1em auto 1em auto;
  }
  :global(.articleBody > *) {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
</style>

<main id="content">
  <article>
    <header>
      <h1>{data.meta.title}</h1>
      <p>By <strong>{data.meta.author ?? siteAuthor}</strong>{#if data.meta.datetime}, posted <em><time datetime={data.meta.datetime}>{formatDate(data.meta.datetime, true).dateString}</time></em>{/if}{#if data.meta.updated}, last updated <em><time datetime={data.meta.updated}>{formatDate(data.meta.updated, true).dateString}</time></em>{/if}
      </p>
    </header>
    <hr>
    <div class="articleBody" itemprop="articleBody">
      <data.content />
    </div>
  </article>
  <hr>
  <footer>This page's text is licensed under {data.meta.license ?? "CC-BY-4.0"}; the rest may not be. See <a href="/licenses">Licenses</a> for more information.</footer>
</main>