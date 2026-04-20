import { siteTitle, siteDescription, siteAuthor } from '$lib/config'
import style from "$lib/global.css?url"
import { getBlogPosts } from '$lib/utils/getblogposts';
import { svgToURI } from '$lib/utils/svgToURI.js';

export async function GET({url, fetch}) {
	const imageTiles = await fetch("/background.svg");
	const posts = await getBlogPosts(undefined, 20, true);
	return new Response(
		`
<?xml version="1.0" encoding="UTF-8" ?>
<?xml-stylesheet href="${style}" type="text/css"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<style xmlns="http://www.w3.org/1999/xhtml">
		feed {
			font-family: var(--default-font);
			margin: 0;
			background: 
				repeating-linear-gradient(
					var(--color-shadow),
					var(--color-shadow)
				) fixed,
				url("${svgToURI(await imageTiles.text())}") fixed repeat 0 0 / 10vw,
				var(--bg-primary);
		}
		feed > * {
			display: grid;
			align-content: center;
			width: var(--content-width);
			background-color: var(--default-background);
			margin: var(--default-margin);
			padding: var(--default-padding);
		}
		feed :not(title, subtitle, entry, description) {
			display: none;
		}
		title {
			font-weight: 700;
		}
		:root {
			color: var(--color-primary);
		}
		@media print {
			feed {
				background-attachment: scroll;
				display: grid;
				justify-content: center;
			}
			feed > * {
				border: black 3px solid;
				overflow: hidden;
			}
		}
	</style>
	<title>${siteTitle}</title>
	<subtitle>${siteDescription}
	This is an Atom Feed. You can subscribe by copying the URL into your reader of choice. Visit https://aboutfeeds.com/ for more information.</subtitle>
	<id>${url.origin}</id>
	<link href="${url.origin}"/>
	<updated>${posts.data.findLast((meta) => Object.keys(meta).includes('datetime')).datetime}</updated>
	<link href="${new URL(url.pathname, url.origin).href}" rel="self"/>
	<link href="${new URL('/blog', url.origin).href}" rel="alternate" type="text/html" />
	<rights>Please visit ${new URL('/licenses', url.origin).href}</rights>
	${posts.data.map(
		(post) => `
		<entry>
			<title>${post.title}</title>
			<description>${post.description}</description>
			<id>${new URL(post.slug, url.origin)}</id>
			<link rel="alternate" type="text/html" href="${new URL(post.slug, url.origin)}" />
			<published>${post.datetime ?? ''}</published>
			<updated>${post.updated ?? post.datetime ?? ''}</updated>
			<summary>${post.description}</summary>
			<content type="html"><![CDATA[
				${post.content.html}
			]]>
			</content>
		</entry>
		`
	).join('')}
</feed>
		`.trim(),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}