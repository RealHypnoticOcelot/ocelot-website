import type { RouteParams } from "$app/types";
import { formatDate } from "./formatDate";
import type { PostFile } from "./getblogposts";
import { getFileName } from "./getFileName";
import { shuffle } from "./shuffle";

const allPosts: Record<string, PostFile> = import.meta.glob("$lib/markdown/blog/**/*.svx", { eager: true });
const postMap: Record<string, PostFile[]> = {};

// Fetch the posts once when the server starts, instead of every time
for (const [path, file] of Object.entries(allPosts)) {
  const key = file.metadata.slug ?? getFileName(path);
  if (!postMap[key]) {
    postMap[key] = [];
  }

  postMap[key].push(
    file
  );
};

// The actual functions here

export const getPost = async (params: RouteParams<any>) => {
  let posts = postMap[params.slug];
  if (!posts) {
    throw new Error(`Post not found: ${params.slug}`)
  }
  if (posts.length > 1) { // If more than one post exists under the same slug, return the one with the matching date
    for (const post of posts) {
      const postDate = formatDate(post.metadata.datetime);
      const paramsDate = formatDate(`${params.year}/${params.month}/${params.day}`);
      if (postDate.YMD == paramsDate.YMD) {
        posts = [post];
        break;
      }
    }
  }
  return posts[0]; // In the event that no posts match the requested date, just return the first one
}

export const randomPost = () => {
  let posts = Object.entries(allPosts);
  return shuffle(posts)[0];
}