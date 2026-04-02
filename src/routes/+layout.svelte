<!--
	Layout
	The contents here will be added to every page;
	prepended before @render, and appended after.
	This is a special page, not available at /layout
-->
<script>
	let { data, children } = $props();
	import { page } from '$app/state';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';
	import Header from '$lib/components/Header.svelte';

	const backgroundCSS = `
	<style>
		body {
			background-image: repeating-linear-gradient(
				rgba(0, 0, 0, 0.3),
				rgba(0, 0, 0, 0.3)
			),
			url("${page.data?.backgroundSVG ?? ''}");
		}
	</style>
	`

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags)); // The meta tags in the nearest layout.ts that defines it, plus page meta tags if applicable
</script>

<MetaTags {...metaTags} />

{@html backgroundCSS}

<style>
	:global(:root) {
		color-scheme: light dark;
		/*
			bg-primary: The background for the main content of the site, e.g. headers and articles
			bg-secondary: A secondary background, should have slightly less 
			color-primary: The color of things like text
			color-secondary: A secondary color for things like text, should have less contrast than bg-primary than color-primary
			color-tertiary: A tertiary color for things like text, should have less contrast with bg-primary than color-secondary 
			color-highlight: An accent color for the site!
			color-shadow: The attributes for a box shadow on the site, color should be an RGBA color of <20% opacity
		*/
		--bg-primary: light-dark(white, black); 
		--bg-secondary: light-dark(rgb(10, 10, 10), rgb(245, 245, 245));
		--color-primary: light-dark(black, white);
		--color-secondary: light-dark(rgb(40, 40, 40), rgb(215, 215, 215));
		--color-tertiary: light-dark(rgb(80, 80, 80), rgb(175, 175, 175));
		--color-highlight: light-dark(#0C6407, #0C6407);
		--color-shadow: 0.1em 0.1em 0.5em light-dark(rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.2));
		--content-width: min(60em, 80vw);
	}
	main {
		margin: 0.5em auto 0.5em auto;
		padding: 1em 2em 1em 2em;
		background-color: var(--bg-primary);
		color: var(--color-primary);
		width: var(--content-width);
		box-shadow: var(--color-shadow);
	}
	:global(a) {
		color: var(--color-highlight);
		white-space: nowrap;
	}
	:global(body) {
		margin: 0;
		background-size: 10vw;
		background-attachment: fixed;
		background-repeat: repeat;
		background-color: var(--bg-primary);
		font-family: "Liberation Sans", "Helvetica Neue", "Noto Sans", "Open Sans", sans-serif;
	}
	@media print {
		:global(body) {
			background-attachment: scroll;
		}
	}
</style>

<Header></Header>
<!-- +page.svelte is `@render`ed here -->
<main id="content">
	{@render children()}
</main>