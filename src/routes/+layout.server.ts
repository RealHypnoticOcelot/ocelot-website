import type { LayoutServerLoad } from './$types';
import { fetchSVG } from '$lib/utils/fetchsvg'; 
import { icons, info } from '@iconify-json/simple-icons';
import { svgToURI } from '$lib/utils/svgToURI';
import { shuffle } from '$lib/utils/shuffle';
import { footerText } from '$lib/config';

const navLinks = [
	{
		title: 'Home',
		slug: '',
	},
	{ 
		title: 'Blog',
	},
	{ 
		title: 'Uses',
	},
	{
		title: '88x31',
	},
  {
    title: "Feed",
    icon: fetchSVG(icons, "rss", info, "1cap", "1cap"),
		target: "_blank"
  }
];

const footerButtons = [
	{
		title: "GitHub",
		url: "https://github.com/RealHypnoticOcelot/",
		icon: fetchSVG(icons, "github", info)
	},
	{
		title: "Bluesky",
		url: "https://bsky.app/profile/ocelot.lol",
		icon: fetchSVG(icons, "bluesky", info)
	},
	{
		title: "Fluxer",
		url: "https://fluxer.gg/Kpo6rpCn",
		icon: fetchSVG(icons, "fluxer", info)
	},
	{
		title: "Discord",
		url: "https://discord.gg/ADMajgMsDX",
		icon: fetchSVG(icons, "discord", info)
	},
	{
		title: "Steam",
		url: "https://steamcommunity.com/id/HypnoticOcelot",
		icon: fetchSVG(icons, "steam", info)
	}
]

const footerLinks = [
	{
		title: 'Privacy Policy',
		slug: 'privacy',
	},
	{
		title: 'Licenses'
	}
];

export const load: LayoutServerLoad = async ({fetch, locals}) => {
  const imageTiles = await fetch("/background.svg");
  let fullbodyImages = Object.values(import.meta.glob('$lib/assets/fullbody-images/*', { eager: true, import: 'default' }));
	let fullbodyImage = String(fullbodyImages[Math.floor(Math.random() * fullbodyImages.length)]);
  return {
    navLinks,
		footerButtons,
		footerLinks,
		footerText: shuffle(footerText)[0],
		fullbodyImage,
		darkTheme: locals.theme, // From hooks.server.ts
    useHandwriting: locals.useHandwriting, // From hooks.server.ts
    backgroundSVG: svgToURI(await imageTiles.text()), // SVG to data URI
  }; // Keep in mind that the SVGs include a number of embedded images, which are not automatically resized.
  // As a rule of thumb, keep your images at a resolution of 512x512 or below.
  // More complex images will take longer to load, and this sort of thing can't be cached!
};