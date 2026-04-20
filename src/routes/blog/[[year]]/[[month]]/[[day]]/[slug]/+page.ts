import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, data }) => {
  const post = await import(`$lib/markdown/blog/${params.slug}.svx`);
  return {
    content: post.default,
    meta: post.metadata,
    ...data
  };
};