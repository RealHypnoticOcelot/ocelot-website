declare module "*.svx" {
  import type { Component } from "svelte";
  import type { PostMetadata } from "$lib/utils/getblogposts";
  const component: Component<any>;
  export default component;

  export const metadata: PostMetadata;
}