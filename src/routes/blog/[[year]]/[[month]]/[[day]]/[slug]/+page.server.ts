import type { PageServerLoad } from './$types'
import { formatDate } from "$lib/utils/formatDate";
import { error, redirect, isRedirect } from "@sveltejs/kit";
import { definePageMetaTags } from 'svelte-meta-tags'; 

export const load: PageServerLoad = async ({ params }) => {
  try {
    const post = await import(`$lib/markdown/blog/${params.slug}.svx`);
    const postDate = formatDate(post.metadata.datetime);
    if (postDate.YMD != formatDate(`${params.year}-${params.month}-${params.day}`).YMD) {
      redirect(301, `/blog/${postDate.YMD}/${params.slug}`)
    }
    const pageTags = definePageMetaTags({
      title: post.metadata.title,
      description: post.metadata.description,
      openGraph: {
        type: 'article',
        title: post.metadata.title,
        description: post.metadata.description,
        article: {
          publishedTime: (postDate.date != new Date (0)) ? postDate.date.toISOString() : ""
        }
      }
    });
    return {
      ...pageTags
    }
  } catch (exception) {
    if (isRedirect(exception)) {
      redirect(301, exception.location);
    } else {
      error(404, `Could not find ${params.slug}`);
    }
  }
}