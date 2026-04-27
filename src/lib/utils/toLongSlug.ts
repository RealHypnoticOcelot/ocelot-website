import { formatDate, type DateFormat } from "./formatDate";

export const toLongSlug = async (filename: string): Promise<string> => {
  let postData = await import(`$lib/markdown/blog/${filename}.svx`);
  postData = postData.metadata;
  const longSlug = "blog/" + ((postData?.datetime ?? 0) ? formatDate(postData.datetime).YMD + "/" : "") + filename;
  return longSlug;
}