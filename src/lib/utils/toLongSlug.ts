import { formatDate } from "./formatDate";
import type { PostMetadata } from "./getblogposts";
import { getFileName } from "./getFileName";

export const toLongSlug = (filename: string, postData: PostMetadata): string => {
  const longSlug = "/blog/" + ((postData.datetime || 0) ? formatDate(postData.datetime ?? 0).YMD + "/" : "") + (postData.slug ?? getFileName(filename));
  return longSlug;
}