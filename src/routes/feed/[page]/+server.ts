import { siteTitle, siteDescription, defaultMaxPosts, siteTextLicense, siteAuthor } from '$lib/config'
import style from "$lib/global.css?url"
import { getBlogPosts } from '$lib/utils/getblogposts';
import { redirect } from '@sveltejs/kit';

export async function GET({url, params}) {
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
	<title>${siteTitle}</title>
	<subtitle>${siteDescription}
	This is an Atom Feed. You can subscribe by copying the URL into your reader of choice. Visit https://aboutfeeds.com/ for more information.</subtitle>
	<id>${new URL(url.origin).href}</id>
	${!posts.isFirstPage ? `<link rel="prev" href="${new URL(`${url.pathname}?page=${pageNumber - 1}`, url.origin)}" />` : ""}
	${!posts.isLastPage ? `<link rel="next" href="${new URL(`${url.pathname}?page=${pageNumber + 1}`, url.origin)}" />` : ""}
	<link href="${url.origin}"/>
	<updated>${posts.data.findLast((meta) => Object.keys(meta).includes('datetime')).datetime}</updated>
	<link href="${new URL(url.pathname, url.origin).href}" rel="self"/>
	<link href="${new URL('/blog/page/1', url.origin).href}" rel="alternate" type="text/html" />
	<rights>Please visit ${new URL('/licenses', url.origin).href}</rights>
	${posts.data.map(
		(post) => `
		<entry>
			<title>${post.title ?? '[NO TITLE]'}</title>
			<author>${post.author ?? siteAuthor}</author>
			<id>${new URL(post.slug, url.origin)}</id>
			<summary>${post.description ?? '[NO DESCRIPTION]'}</summary>
			<link rel="alternate" type="text/html" href="${new URL(post.slug, url.origin)}" />
			<published>${post.datetime ?? ''}</published>
			<updated>${post.updated ?? post.datetime ?? ''}</updated>
			<rights>${post.license ?? siteTextLicense.licenseName}</rights>
			<content type="html"><![CDATA[
				${post.content.html.replace("]]>", "]]]]><![CDATA[>")}
			]]>
			</content>
		</entry>
		` // The html.replace prevents the feed from breaking in the event of the line terminator being used, see https://news.ycombinator.com/item?id=48280967
	).join('')}
</feed>
		`.trim(),
		{
			status: 200,
			headers: {
				'Content-Type': 'text/xml; charset=utf-8',
				'Cache-Control': 'max-age=86400', // The amount of seconds (well-behaved) feed readers will wait between requests
				'Access-Control-Allow-Origin': '*'
			}
		}
	);
}