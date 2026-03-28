import { dev } from '$app/environment';
import type { LayoutLoad } from './$types';
import favicon from '$lib/assets/favicon.svg';
import banner from '$lib/assets/unremy_banner.png';

export const prerender = false;
// Prerender pages by default, can be overridden
// by setting to false on a specific page/template

export const csr = false;
// Disabling JavaScript, means:
// The webpage should work with HTML and CSS only.
// <script> tags inside all Svelte components are removed.
// <form> elements cannot be progressively enhanced.
// Links are handled by the browser with a full-page navigation.
// Hot Module Replacement (HMR) will be disabled.
// You can set csr = dev in order to enable it during development.

export const load: LayoutLoad = ({ data, url }) => {
  let defaultMetadata = {
    title: "HypnoticOcelot",
    meta: [
      { "charset": "utf-8" },
      { "name": "viewport", "content": "width=device-width, initial-scale=1" },
      { "name": "author", "content": "HypnoticOcelot" },
      { "name": "description", "content": "Welcome to my personal website!" }, // Long description
      { "name": "keywords", "content": "HypnoticOcelot, Blog, Personal Site" },
      { "name": "theme-color", "content": "#000000" },
      { "name": "mobile-web-app-capable", "content": "yes" },
      { "name": "og:description", "property": "twitter:description", "content": "I do things" }, // Short description
      { "name": "og:type", "content": "website" },
      { "name": "og:image", "property": "twitter:image", "content": banner },
      { "name": "og:image:alt", "property": "twitter:image:alt", "content": "Sketches of HypnoticOcelot's fursona, done by Unremy" },
      { "name": "og:locale", "content": "en_US" }
    ],
    link: [
      { "rel": "icon", "href": favicon, "type": "image/svg+xml", "sizes": "any" },
      { "rel": "apple-touch-icon", "href": favicon }, // TODO FIX
      { "rel": "canonical", "href": url.origin + url.pathname }, // If you use href, queries like ?q=test would be included
      // { "rel": "license", "href": "https://example.com/"}, // TODO Decide how to license things
      { "rel": "me", "href": "https://github.com/RealHypnoticOcelot" },
      { "rel": "me", "href": "https://bsky.app/profile/ocelot.lol" },
      { "rel": "me", "href": "https://steamcommunity.com/id/HypnoticOcelot" },
      { "rel": "me", "href": "https://fluxer.gg/Kpo6rpCn" }
      // TODO: Add Dublin Core tags
    ]
	};
  defaultMetadata.meta.push(
    { "name": "og:title", "property": "twitter:title", "content": defaultMetadata.title },
    { "name": "og:site_name", "content": defaultMetadata.meta.find(element => element.name == "author")?.content ?? "" },
    { "name": "og:url", "content": defaultMetadata.link.find(element => element.rel == "canonical")?.href ?? "" },
  );
  return {
    metadata: {
      ...defaultMetadata,
      // @ts-ignore to ignore the following error in the IDE, deal with later
      ...(data?.metadata ?? {}) // Only exists when children define it
    },
    ...data // Make sure not to discard the server data
  };
};