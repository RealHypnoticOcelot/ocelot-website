import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { definePageMetaTags } from 'svelte-meta-tags';

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`$lib/markdown/privacy.svx`);
    const pageTags = definePageMetaTags({
      title: post.metadata.title
    });
    return {
      content: post.default,
      ...pageTags
    };
  } catch {
    error(404, 'Not found');
  }
};