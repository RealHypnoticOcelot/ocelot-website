import { dev } from '$app/environment';
import type { LayoutLoad } from './$types';
import { siteAuthor, siteDescription, siteShortDescription, siteTitle } from '$lib/config';
import { defineBaseMetaTags } from 'svelte-meta-tags'; // As much as I preferred my own solution, I wanted a deep merge function and didn't want to make it myself
import favicon from '$lib/assets/favicon.svg';
import banner from '$lib/assets/unremy_banner.png';

export const prerender = false;
// Prerender pages by default, can be overridden
// by setting to false on a specific page/template

export const csr = true;
// Disabling JavaScript, means:
// The webpage should work with HTML and CSS only.
// <script> tags inside all Svelte components are removed.
// <form> elements cannot be progressively enhanced.
// Links are handled by the browser with a full-page navigation.
// Hot Module Replacement (HMR) will be disabled.
// You can set csr = dev in order to enable it during development.

export const load: LayoutLoad = async ({ data, url }) => {
  const baseTags = defineBaseMetaTags({
    titleTemplate: `%s | ${siteTitle}`,
    description: siteDescription, // Long description
    keywords: ["HypnoticOcelot", "Blog", "Personal Site"],
    canonical: new URL(url.pathname, url.origin).href, // creates a cleaned up URL (without hashes or query params) from your current URL
    openGraph: {
      type: "website",
      url: new URL(url.pathname, url.origin).href,
      locale: 'en_US',
      description: siteShortDescription, // Short description
      siteName: siteTitle,
      images: [
        {
          url: banner,
          alt: "Sketches of HypnoticOcelot's fursona, done by Unremy"
        }
      ]
    },
    additionalMetaTags: [
      { "name": "author", "content": siteAuthor },
      { "name": "theme-color", "content": "#000000" },
      { "name": "mobile-web-app-capable", "content": "yes" }
    ],
    additionalLinkTags: [
      { "rel": "icon", "href": favicon, "type": "image/svg+xml", "sizes": "any" },
      { "rel": "apple-touch-icon", "href": favicon }, // TODO FIX
      { "rel": "license", "href": new URL("licenses", url.origin).href},
      { "rel": "me", "href": "https://github.com/RealHypnoticOcelot" },
      { "rel": "me", "href": "https://bsky.app/profile/ocelot.lol" },
      { "rel": "me", "href": "https://steamcommunity.com/id/HypnoticOcelot" },
      { "rel": "me", "href": "https://fluxer.gg/Kpo6rpCn" },
      { "rel": "alternate", "href": new URL("feed", url.origin).href }
    ]
  });
  return {
    ...baseTags,
    ...data, // If this isn't included, you lose data from server.ts
  };
};