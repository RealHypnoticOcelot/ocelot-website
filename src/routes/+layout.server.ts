import type { LayoutServerLoad } from './$types';
import { fetchSVG } from '$lib/utils/fetchsvg'; 
import { icons, info } from '@iconify-json/simple-icons';
import { shuffle } from '$lib/utils/shuffle';
import { footerText, siteTextLicense } from '$lib/config';

const navLinks = [
	{
		title: 'Home',
		slug: '',
	},
	{ 
		title: 'Blog',
	},
	{
		title: 'About',
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
  return {
    navLinks,
		footerButtons,
		footerLinks,
		footerText: shuffle(footerText)[0],
		license: siteTextLicense,
		darkTheme: locals.theme, // From hooks.server.ts
    useHandwriting: locals.useHandwriting, // From hooks.server.ts
  };
};