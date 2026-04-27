import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { definePageMetaTags } from 'svelte-meta-tags';

export const load: PageLoad = async ({ url }) => {
  try {
    const pageTags = definePageMetaTags({
      title: '88x31'
    });
    return {
      ...pageTags,
      thisSite: url.host
    };
  } catch {
    error(404, 'Not found');
  }
};