<script>
  let { data } = $props();
  import { formatDate } from '$lib/utils/formatDate';
  import { siteAuthor, siteTextLicense, siteTitle } from '$lib/config.js';
</script>

<style>
  hgroup {
    display: grid;
    grid-template-columns: auto;
    align-items: end;
    text-align: left;
  }
  time {
    color: var(--color-secondary);
  }
  div[itemprop=articleBody] {
    margin: 1em auto 1em auto;
  }
  :global(div[itemprop=articleBody] > *) {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
</style>


<article>
  <hgroup>
    <h1 itemprop="headline">{data.meta?.title ?? "[NO TITLE]"}</h1>
    <p>By <strong itemprop="author">{data.meta?.author ?? siteAuthor}</strong>{#if data.meta?.datetime ?? 0 != 0}, posted <em><time itemprop="datePublished" title={data.meta.datetime} datetime={data.meta.datetime}>{formatDate(data.meta.datetime, true).dateString}</time></em>{/if}{#if data.meta?.updated ?? 0 != 0}, last updated <em><time datetime={data.meta.updated}>{formatDate(data.meta.updated, true).dateString}</time></em>{/if}
    </p>
  </hgroup>
  <hr>
  <div itemprop="articleBody">
    <data.content />
  </div>
</article>