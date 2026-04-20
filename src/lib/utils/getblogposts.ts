import { defaultMaxPosts } from "$lib/config";
import { render } from "svelte/server";
import { toLongSlug } from "./toLongSlug";
import type { Component } from "svelte";

export type PostMetadata = {
  title: string;
  author?: string;
  datetime?: string; // The date showing the time a post was created
  description: string;
  license?: string;
  updated?: string; // The date showing the last time a post was updated
  hiddentime?: string; // A date that shouldn't be shown to the user, but is used when sorting the blog posts by date
}

export type PostFile = {
  default: Component;
  metadata: PostMetadata;
}

export type BlogPosts = {
  data: Array<any>;
  totalPosts: number;
}

export const getBlogPosts = async ( offset: number = 1, maxPosts: number = defaultMaxPosts, includeContent: boolean = false): Promise<BlogPosts> => {
  const paths: Record<string, PostFile> = import.meta.glob("$lib/markdown/blog/*", { eager: true });
  const posts: Array<any> = await Promise.all( Object.entries(paths)
    .map(async ([path, file]) => {
      const postData: PostMetadata = file.metadata;
      const postSlug = await toLongSlug((path.split("/").pop() ?? "post").replace(`.svx`, ""));
      return {
        content: includeContent ? render(file.default) : undefined,
        ...postData,
        slug: postSlug,
      };
    }));
  let sortedPosts = posts.sort((a, b) => new Date(b.hiddentime ?? b.updated ?? b.datetime ?? 0).getTime() - new Date(a.hiddentime ?? a.updated ?? a.datetime ?? 0).getTime());
  if (offset) {
    sortedPosts = sortedPosts.slice((offset - 1 ) * maxPosts)
  };

  if (maxPosts && maxPosts < sortedPosts.length && maxPosts != -1) {
		sortedPosts = sortedPosts.slice(0, maxPosts)
  };
  return {
    data: sortedPosts,
    totalPosts: posts.length
  }
};