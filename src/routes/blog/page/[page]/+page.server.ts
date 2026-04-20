import { getBlogPosts } from "$lib/utils/getblogposts";
import { defaultMaxPosts } from "$lib/config.js";
import { error, redirect, isRedirect } from "@sveltejs/kit";

export const load = async ({params}) => {
  try {
    if (isNaN(parseInt(params.page))) {
      redirect(301, `/blog/page/1`)
    }
    const posts = await getBlogPosts(parseInt(params.page) || 1); 
    if (posts.data.length < 1) {
      redirect(301, `/blog/page/${Math.ceil(posts.totalPosts / defaultMaxPosts)}`)
    }
    return {
      posts,
      isFirstPage: parseInt(params.page) == 1,
      isLastPage: (posts.totalPosts / defaultMaxPosts) <= parseInt(params.page),
      pageNumber: parseInt(params.page)
    };
  } catch (exception) {
    if (isRedirect(exception)) {
      redirect(exception.status, exception.location);
    } else {
      error(404, `Could not find page ${params.page}: ${exception}`);
    }
  }
};