<!--
	Layout
	The contents here will be added to every page;
	prepended before @render, and appended after.
	This is a special page, not available at /layout
-->
<script>
	let { data, children } = $props();
	let { theme, useHandwriting } = $derived(data);
	import { page } from '$app/state';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';
	import Header from '$lib/components/Header.svelte';
	import hypnofont from "$lib/assets/Hypnoticocelot-Regular.otf"
	import rdr_image from "$lib/assets/rdr_cropped.png";
	const backgroundCSS = `
	<style>
		body {
			background: 
				repeating-linear-gradient(
					var(--color-shadow),
					var(--color-shadow)
				),
				url("${page.data?.backgroundSVG ?? ''}") fixed repeat 0 0 / 10vw,
				var(--bg-primary);
		}
		@media print {
			body {
				background-attachment: scroll;
			}
		}
	</style>
	`

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags)); // The meta tags in the nearest layout.ts that defines it, plus page meta tags if applicable
</script>

<MetaTags {...metaTags} />

{@html backgroundCSS}

<style>
	:global(:root) {
		/*
			bg-primary: The background for the main content of the site, e.g. headers and articles
			bg-secondary: A secondary background, should have slightly less 
			color-primary: The color of things like text
			color-secondary: A secondary color for things like text, should have less contrast than bg-primary than color-primary
			color-tertiary: A tertiary color for things like text, should have less contrast with bg-primary than color-secondary 
			color-highlight: An accent color for the site!
			color-shadow: The color for a box shadow on the site, should be an RGBA color of <20% opacity
		*/
		color-scheme: dark light;
		--bg-primary: light-dark(rgb(255, 255, 255), rgb(0, 0, 0)); 
		--bg-secondary: light-dark(rgb(245, 245, 245), rgb(10, 10, 10));
		--color-primary: light-dark(rgb(0, 0, 0), rgb(255, 255, 255));
		--color-secondary: light-dark(rgb(80, 80, 80), rgb(175, 175, 175));
		--color-tertiary: light-dark(rgb(160, 160, 160), rgb(95, 95, 95));
		--color-highlight: light-dark(#0C6407, #15E209);
		--color-shadow: light-dark(rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.2));
		--content-width: min(60em, 80vw);
		--default-margin: 0.5em auto 0.5em auto;
		--default-padding: 1em 2em 1em 2em;
		--default-background: color(from var(--bg-primary) srgb r g b  / 0.9);
		--default-font: "Liberation Sans", "Helvetica Neue", "Noto Sans", "Open Sans", sans-serif;
		scrollbar-color: var(--color-highlight) var(--bg-primary);
		--box-shadow: 0.1em 0.1em 0.5em var(--color-shadow);
	}
	:global(:root[darktheme='true']) {
		color-scheme: dark;
	}
	:global(:root[darktheme='false']) {
		color-scheme: light;
	}
	:global(:root[usehandwriting='true']) {
		--default-font: 'hypnoticocelot';
	}
	main {
		margin: var(--default-margin);
		padding: var(--default-padding);
		background-color: var(--default-background);
		color: var(--color-primary);
		width: var(--content-width);
	}
	:global(a) {
		color: var(--color-highlight);
		white-space: nowrap;
	}
	:global(body) {
		margin: 0;
		font-family: var(--default-font);
	}
	.rdr {
		position: fixed;
		max-height: 100vh;
		bottom: 0;
		right: 0;
		z-index: -1;
		max-width: 50vw;
	}
	@media print {
		@page {
			margin: 0;
		}
		:global(body) {
			display: grid;
			justify-content: center;
		}
		:global(:root) {
			color-scheme: only light;
			--default-margin: 0.5em 0 0.5em 0;
			--content-width: 100vw;
			--box-shadow: none;
		}
		.rdr {
			display: none;
		}
	}
</style>

<Header {theme} {useHandwriting} />
<!-- +page.svelte is `@render`ed here -->
<main id="content">
	{@render children()}
</main>

<img class="rdr" src={rdr_image} alt="HypnoticOcelot's fursona, designed by RamDaRam">