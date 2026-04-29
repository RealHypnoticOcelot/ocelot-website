<!--
	Layout
	The contents here will be added to every page;
	prepended before @render, and appended after.
	This is a special page, not available at /layout
-->
<script>
	import { page } from '$app/state';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';
	import Header from '$lib/components/Header.svelte';
	import PrintHeader from '$lib/components/PrintHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import hypnoFont from "$lib/assets/Hypnoticocelot-Regular.otf"
	import '$lib/global.css';
	let { data, children } = $props();
	let { darkTheme, useHandwriting, navLinks, footerButtons, footerLinks, fullbodyImage } = $derived(data);
	const footerText = page.data.footerText; // We don't want this to update in response to things like form actions
	const backgroundCSS = `
	<style>
		:root {
			--tile-background: url("${page.data.backgroundSVG ?? ''}");
		}
		@font-face {
			font-family: "Hypnoticocelot";
			src:
				local('Hypnoticocelot'),
				url(${hypnoFont});
			font-weight: normal;
			font-style: normal;
		}
	</style>
	`

	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags)); // The meta tags in the nearest layout.ts that defines it, plus page meta tags if applicable
</script>

<MetaTags {...metaTags} />

<PrintHeader />

{@html backgroundCSS}

<style>
	:global(:root[darktheme='true']) {
		color-scheme: dark;
	}
	:global(:root[darktheme='false']) {
		color-scheme: light;
	}
	:global(:root[usehandwriting='true']) {
		--default-font: 'Hypnoticocelot';
		font-weight: bold;
	}
	:global(:root[usehandwriting='true'] ul) {
		list-style-type: handwriting-circle;
	}
	.fullbodyImage {
		position: fixed;
		max-height: 100vh;
		bottom: 0;
		right: 0;
		z-index: -1;
		max-width: 50vw;
	}
	@media print {
		.fullbodyImage {
			display: none;
		}
	}
</style>
<Header {darkTheme} {useHandwriting} {navLinks}/>
<!-- +page.svelte is `@render`ed here -->
{@render children()}
<Footer {footerButtons} {footerLinks} {footerText} />
<img class="fullbodyImage" src={fullbodyImage} alt={'HypnoticOcelot\'s fursona; art by ' + fullbodyImage.substring(fullbodyImage.lastIndexOf('/') + 1, fullbodyImage.lastIndexOf('.')) }>