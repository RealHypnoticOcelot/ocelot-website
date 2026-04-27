import { getBlogPosts } from "$lib/utils/getblogposts";
import { defaultMaxPosts } from "$lib/config.js";
import { error, redirect, isRedirect } from "@sveltejs/kit";

export const load = async ({params}) => {
  try {
    const pageNumber = parseInt(params.page ?? '');
    if (isNaN(pageNumber) || (pageNumber == 0 || pageNumber < -1)) {
      redirect(301, `/blog/page/1`)
    }
    const posts = await getBlogPosts(Math.abs(pageNumber) || 1, pageNumber == -1 ? -1 : defaultMaxPosts); 
    if (pageNumber > posts.lastPage && pageNumber != -1) {
      redirect(301, `/blog/page/${posts.lastPage}`)
    }
    return {
      posts,
      pageNumber
    };
  } catch (exception) {
    if (isRedirect(exception)) {
      redirect(exception.status, exception.location);
    } else {
      error(404, `Could not find page ${params.page}: ${exception}`);
    }
  }
};