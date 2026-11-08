<script>
  let { data } = $props();
  import { formatDate } from '$lib/utils/formatDate';
  import { siteAuthor } from '$lib/config.js';
  import { onMount } from 'svelte';
  let timezone = $state(false)
  onMount(async() => {
    timezone = true;
  }) // This code will only run if the user has JS enabled (see https://svelte.dev/docs/kit/faq#How-do-I-use-a-client-side-library-accessing-document-or-window).
  // Timezone being true will pass null  to the formatDate code,
  // and so the date string will convert to the user's timezone.
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
    <p>By <strong itemprop="author">{data.meta?.author ?? siteAuthor}</strong>{#if data.meta?.datetime ?? 0 != 0}, posted <em><time itemprop="datePublished" title={data.meta.datetime} datetime={data.meta.datetime}>{formatDate(data.meta.datetime, timezone ? null : data.meta.timezone).dateString}</time></em>{/if}{#if data.meta?.updated ?? 0 != 0}, last updated <em><time title={data.meta.updated} datetime={data.meta.updated}>{formatDate(data.meta.updated, timezone ? null : data.meta.updatedTimezone ?? data.meta.timezone).dateString}</time></em>{/if}
    </p>
  </hgroup>
  <hr>
  <div itemprop="articleBody">
    <data.content />
  </div>
</article>