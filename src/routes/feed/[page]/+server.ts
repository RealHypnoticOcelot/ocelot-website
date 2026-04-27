import { siteTitle, siteDescription, defaultMaxPosts, siteTextLicense } from '$lib/config'
import style from "$lib/global.css?url"
import { getBlogPosts } from '$lib/utils/getblogposts';
import { svgToURI } from '$lib/utils/svgToURI.js';
import { redirect } from '@sveltejs/kit';

export async function GET({url, fetch, params}) {
	const imageTiles = await fetch("/background.svg");
	const pageNumber = parseInt(params.page ?? '');
	if (isNaN(pageNumber) || (pageNumber == 0 || pageNumber < -1)) { // If pageNumber is neither a number nor a positive number nor -1
		redirect(301, `/feed/1`)
	};
	const posts = await getBlogPosts(Math.abs(pageNumber) || 1, pageNumber == -1 ? -1 : defaultMaxPosts, true);
	if (pageNumber > posts.lastPage && pageNumber != -1) { // If the page number is above the largest page number, and isn't -1
		redirect(301, `/feed/${posts.lastPage}`)
	};
	return new Response(
`
<?xml version="1.0" encoding="UTF-8" ?>
<?xml-stylesheet href="${style}" type="text/css"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<style xmlns="http://www.w3.org/1999/xhtml">
		:root {
			--tile-background: url("${svgToURI(await imageTiles.text())}")
		}
		feed > * {
			display: grid;
			align-content: center;
			width: var(--content-width);
			background-color: var(--default-background);
			margin: var(--default-margin);
			padding: var(--default-padding);
			color: var(--color-primary);
		}
		feed :not(title, subtitle, entry, description, entry > id) {
			display: none;
		}
		title {
			font-weight: 700;
		}
	</style>
	<title>${siteTitle}</title>
	<subtitle>${siteDescription}
	This is an Atom Feed. You can subscribe by copying the URL into your reader of choice. Visit https://aboutfeeds.com/ for more information.</subtitle>
	<id>${url.origin}</id>
	${!posts.isFirstPage ? `<link rel="prev" href="${new URL(`${url.pathname}?page=${pageNumber - 1}`, url.origin)}" />` : ""}
	${!posts.isLastPage ? `<link rel="next" href="${new URL(`${url.pathname}?page=${pageNumber + 1}`, url.origin)}" />` : ""}
	<link href="${url.origin}"/>
	<updated>${posts.data.findLast((meta) => Object.keys(meta).includes('datetime')).datetime}</updated>
	<link href="${new URL(url.pathname, url.origin).href}" rel="self"/>
	<link href="${new URL('/blog', url.origin).href}" rel="alternate" type="text/html" />
	<rights>Please visit ${new URL('/licenses', url.origin).href}</rights>
	${posts.data.map(
		(post) => `
		<entry>
			<title>${post.title ?? '[NO TITLE]'}</title>
			<id>${new URL(post.slug, url.origin)}</id>
			<description>${post.description ?? '[NO DESCRIPTION]'}</description>
			<link rel="alternate" type="text/html" href="${new URL(post.slug, url.origin)}" />
			<published>${post.datetime ?? ''}</published>
			<updated>${post.updated ?? post.datetime ?? ''}</updated>
			<rights>${post.license ?? siteTextLicense}</rights>
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
				'Content-Type': 'text/xml;charset=utf-8',
				'Cache-Control': 'max-age=86400', // The amount of seconds (well-behaved) feed readers will wait between requests
				'Access-Control-Allow-Origin': '*'
			}
		}
	);
}