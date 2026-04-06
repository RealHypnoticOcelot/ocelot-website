<script lang="ts">
	import { page } from '$app/state';
	import ToggleSwitch from './ToggleSwitch.svelte';
	import logo from "$lib/assets/favicon.svg";
	import { fetchSVG } from '$lib/utils/fetchsvg';
	import { icons, info }  from '@iconify-json/ri';
	let { theme, useHandwriting } = $props();
</script>

<style>
	header {
		display: grid;
		grid-template-columns: min-content 3fr auto;
		background-color: var(--default-background);
		align-items: center;
		justify-items: center;
		margin: var(--default-margin);
		width: var(--content-width);
		min-height: 5vh;
		padding: var(--default-padding);
	}
	header img {
		height: 5em;
	}
	header > * {
		display: flex;
		flex-wrap: wrap;
		padding: 0.5em;
	}
	nav a {
		padding: 1em;
		text-decoration: none;
	}
	a :global {
		svg {
			vertical-align: baseline;
		}
	}
	#skip {
		position: fixed;
		top: 0;
		left: 0;
		background-color: var(--bg-primary);
		transform: translatey(0);
	}
	#skip:not(:focus) {
		transform: translateY(-10em);
	}
	fieldset {
		justify-content: center;
	}
	@media print {
		fieldset {
			display: none;
		}
	}
</style>

<header>
	<a id="skip" href="#content">Skip To Content</a>
	<a href={page.url.origin}>
		<img src={logo} alt="HypnoticOcelot Logo"/>
	</a>
	<nav>
		{#each page.data.nav_links as link}
			<a
				href="/{link.slug}"
				aria-current={page.url.pathname.startsWith(`/${link.slug}`) ? 'page' : null}
			>
				{link.title ?? ""}
				{#if link.icon}
					{@html link.icon}
				{/if}
			</a>
		{/each}
	</nav>
	<fieldset>
		<ToggleSwitch
			checkedType="darkTheme"
			checked={theme}
			offContent={fetchSVG(icons, 'sun-fill', info)}
			onContent={fetchSVG(icons, 'moon-fill', info)}
		></ToggleSwitch>
		<ToggleSwitch
			checkedType="useHandwriting"
			checked={useHandwriting}
			offContent="Aa"
			onContent="Aa"
			--onFont="hypnoticocelot"
		></ToggleSwitch>
	</fieldset>
</header>