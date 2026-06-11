import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { definePageMetaTags } from 'svelte-meta-tags';

export const load: PageLoad = async ({ url }) => {
  try {
    const pageTags = definePageMetaTags({
      title: '88x31',
      description: "A collection of 88x31 buttons.",
      openGraph: {
        title: '88x31',
        description: "My 88x31 buttons!",
      }
    });
    return {
      ...pageTags,
    };
  } catch {
    error(404, 'Not found');
  }
};