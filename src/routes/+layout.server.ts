import type { LayoutServerLoad } from './$types';
import { fetchSVG } from '$lib/utils/fetchsvg'; 

const nav_links = [
	{
		title: 'Home',
		slug: '',
	},
	{ 
		title: 'Blog',
		slug: 'blog',
	},
	{
		title: 'About',
		slug: 'about'
	},
	{
		title: 'Licenses',
		slug: 'licenses'
	},
	{
		title: 'Contact',
		slug: 'contact'
	},
  {
    title: "RSS Feed",
    slug: 'feed',
    icon: fetchSVG("rss", "1cap", "1cap")
  }
];

export const load: LayoutServerLoad = async ({fetch}) => {
  const imageTiles = await fetch("/background.svg")
  return {
    nav_links,
    backgroundSVG: "data:image/svg+xml;utf8," + encodeURIComponent(await imageTiles.text()), // SVG to data URI
  }; // Keep in mind that the SVGs include a number of embedded images, which are not automatically resized.
  // As a rule of thumb, keep your images at a resolution of 512x512 or below.
  // More complex images will take longer to load, and this sort of thing can't be cached!
};