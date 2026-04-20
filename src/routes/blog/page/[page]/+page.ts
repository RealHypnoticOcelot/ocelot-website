import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { definePageMetaTags } from 'svelte-meta-tags';

export const load: PageLoad = async ({ data }) => {
  try {
    const pageTags = definePageMetaTags({
      title: `Blog Posts: Page ${data.pageNumber}`
    });
    return {
      ...pageTags,
      ...data
    };
  } catch {
    error(404, 'Not found');
  }
};