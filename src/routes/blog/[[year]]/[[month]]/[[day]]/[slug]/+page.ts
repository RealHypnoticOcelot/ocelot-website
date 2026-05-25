import { formatDate } from "$lib/utils/formatDate";
import { getPost } from "$lib/utils/getPost";
import { error, isRedirect, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { definePageMetaTags } from "svelte-meta-tags";
import { siteTitle, siteDescription, siteShortDescription } from "$lib/config";

export const load: PageLoad = async ({ params, data }) => {
  try {
    const post = await getPost(params);
    const postDate = formatDate(post.metadata.datetime);
    const paramsDate = formatDate(`${params.year}/${params.month}/${params.day}`)
    if (postDate.YMD != paramsDate.YMD) {
      redirect(301, `/blog/${postDate.YMD}/${params.slug}`)
    }
    const pageTags = definePageMetaTags({
      title: post.metadata?.title ?? siteTitle,
      description: post.metadata?.description ?? siteDescription,
      openGraph: {
        type: 'article',
        title: post.metadata?.title ?? siteTitle,
        description: post.metadata?.shortDescription ?? post.metadata?.description ?? siteShortDescription,
        article: {
          publishedTime: (postDate.date != new Date (0)) ? postDate.date.toISOString() : ""
        }
      }
    });
    return {
      content: post.default,
      meta: post.metadata,
      ...pageTags
    };
  } catch (exception) {
    if (isRedirect(exception)) {
      redirect(301, exception.location);
    } else {
      error(404, `${exception}`);
    }
  }
};