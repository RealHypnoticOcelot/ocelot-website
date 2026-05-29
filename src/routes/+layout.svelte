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
	import hypnoFont from "$lib/assets/Hypnoticocelot-Regular.woff2"
	import '$lib/global.css';
  import { getFileName } from '$lib/utils/getFileName.js';
	import LicenseFooter from '$lib/components/LicenseFooter.svelte';
	import { siteTextLicense } from '$lib/config.js';
	let { data, children } = $props();
	let { darkTheme, useHandwriting, navLinks, footerButtons, footerLinks, fullbodyImage } = $derived(data);
	const footerText = page.data.footerText; // We don't want this to update in response to things like form actions
	const backgroundCSS = `
	<style>
		@font-face {
			font-family: "Hypnoticocelot";
			src:
				local('Hypnoticocelot'),
				url("${hypnoFont}");
			font-weight: normal;
			font-style: normal;
		}
	</style>
	`

	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags)); // The meta tags in the nearest layout.ts that defines it, plus page meta tags if applicable
	let license = $derived(page.data.license);
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
		max-height: 100dvh;
		bottom: 0;
		right: 0;
		z-index: -1;
		max-width: 50dvw;
	}
	.jsPrompt {
		display: flex;
		justify-content: center;
	}
	@media print {
		.fullbodyImage, .jsPrompt {
			display: none;
		}
	}
</style>
<div class="mainContent" itemprop="document">
<Header {darkTheme} {useHandwriting} {navLinks}/>
<!-- +page.svelte is `@render`ed here -->
<main id="content">
	{@render children()}
	<LicenseFooter {license} />
</main>
<Footer {footerButtons} {footerLinks} {footerText} />
</div>
<noscript>
	<footer class="jsPrompt">
		<sub>Please consider enabling JavaScript, this site looks a lot nicer with it enabled!</sub>
	</footer>
</noscript>
<img class="fullbodyImage" src={fullbodyImage} alt={'HypnoticOcelot\'s fursona; art by ' + getFileName(fullbodyImage) }>