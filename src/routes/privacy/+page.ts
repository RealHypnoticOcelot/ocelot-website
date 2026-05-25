import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { definePageMetaTags } from 'svelte-meta-tags';
import { siteTitle, siteDescription, siteShortDescription, siteTextLicense } from '$lib/config';

export const load: PageLoad = async () => {
  try {
    const post = await import(`$lib/markdown/privacy.svx`);
    const pageTags = definePageMetaTags({
      title: post.metadata.title ?? "[NO TITLE]",
      description: post.metadata?.description ?? siteDescription,
      openGraph: {
        title: post.metadata?.title ?? siteTitle,
        description: post.metadata?.shortDescription ?? post.metadata?.description ?? siteShortDescription,
      }
    });
    return {
      content: post.default,
      license: post.metadata.license ?? siteTextLicense,
      ...pageTags
    };
  } catch {
    error(404, 'Not found');
  }
};