import type { LayoutLoad, LayoutParentData } from '../$types';

export const load: LayoutLoad = async({ parent, url }) => {
  const parentData = await parent();
  return {
    ...parentData,
    metadata: {
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
    },
  }
};