import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = ({ url }) => {
  return {
    metadata: {
      title: "Testing",
      meta: [
        { "name": "og:type", "content": "article" }
      ],
    },
    extraMetadata: {
      link: [
        {
          "rel": "icon",
          "href": "https://examplerrr.com/",
          "type": "image/svg",
          "sizes": "any"
        }
      ]
    }
  }
};