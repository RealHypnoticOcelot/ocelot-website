<!--
	Layout
	The contents here will be added to every page;
	prepended before @render, and appended after.
	This is a special page, not available at /layout
-->
<script>
	let { data, children } = $props();
	let { darkTheme, useHandwriting } = $derived(data);
	import { page } from '$app/state';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import hypnofont from "$lib/assets/Hypnoticocelot-Regular.otf"
	import rdr_image from "$lib/assets/rdr_cropped.png";
	import '$lib/global.css';
	const backgroundCSS = `
	<style>
		body {
			background: 
				repeating-linear-gradient(
					var(--color-shadow),
					var(--color-shadow)
				) fixed,
				url("${page.data?.backgroundSVG ?? ''}") fixed repeat 0 0 / 10vw,
				var(--color-highlight);
		}
		@font-face {
			font-family: "hypnoticocelot";
			src: ${hypnofont};
			font-weight: normal;
			font-style: normal;
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
<svelte:head>
	<link rel="preload" as="image" href={rdr_image}>
</svelte:head>

{@html backgroundCSS}

<style>
	:global(:root[darktheme='true']) {
		color-scheme: dark;
	}
	:global(:root[darktheme='false']) {
		color-scheme: light;
	}
	:global(:root[usehandwriting='true']) {
		--default-font: 'hypnoticocelot';
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
		.rdr {
			display: none;
		}
	}
</style>

<Header {darkTheme} {useHandwriting} />
<!-- +page.svelte is `@render`ed here -->
{@render children()}
<Footer/>
<img class="rdr" src={rdr_image} alt="HypnoticOcelot's fursona; art by RamDaRam(람다람)">