<script>
	import { page } from '$app/state';
	import ToggleSwitch from './ToggleSwitch.svelte';
	import logo from "$lib/assets/favicon_rendered.svg";
	import { fetchSVG } from '$lib/utils/fetchsvg';
	import { icons, info }  from '@iconify-json/ri';
	let { darkTheme, useHandwriting, navLinks } = $props();
</script>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		/* position: sticky;
		top: 0; */
	}
	[itemprop=logo] {
		height: 6em;
		overflow: scroll; /* For alt text not to overflow */
		max-width: 50vw; /* Just in case it doesn't load */
		/* Rules specific to a pixel icon:
		image-rendering: pixelated;
		border: 0.25em white solid; */
	}
	header > * {
		display: flex;
		flex-wrap: wrap;
	}
	nav {
		flex-grow: 1;
		justify-content: center;
	}
	nav a {
		padding: 0 1em 0 1em;
		margin: 2em 0 2em 0;
		text-decoration: none;
	}
	a :global {
		svg {
			vertical-align: baseline;
		}
	}
	#skip:not(:focus), legend {
		position: absolute;
		transform: translateY(-100em);
		background-color: var(--bg-primary);
		left: -1000px;
	}
	#skip {
		position: fixed;
		top: 0;
		left: 0;
		background-color: var(--bg-primary);
		transform: translatey(0);
	}
	fieldset {
		justify-content: center;
		border: none;
	}
	#headerLinks > *:not(:last-child) {
		border-right: 0.1em solid var(--color-highlight);
	}
	@media print {
		header {
			display: none;
		}
	}
	/* @media print {
		header {
				grid-template-columns: min-content auto;
		}
		fieldset {
			display: none;
			position: fixed;
		}
	} */
</style>

<header>
	<a id="skip" href="#content">Skip To Content</a>
	<a href="/">
		<img
			src={logo} alt="HypnoticOcelot Logo"
			aria-current={page.route.id == "/" ? 'page' : null}
			itemprop="logo"
		/>
	</a>
	<nav id="headerLinks" data-sveltekit-keepfocus>
		{#each navLinks as link}
			<a
				href="/{link.slug ?? link.title.toLowerCase()}"
				aria-current={page.url.pathname.startsWith(`/${link.slug ?? link.title.toLowerCase()}`) ? 'page' : null}
				target={link.target}
			>
				{link.title ?? ""}
				{#if link.icon}
					{@html link.icon}
				{/if}
			</a>
		{/each}
	</nav>
	<fieldset>
		<legend>Theme Settings</legend>
		<ToggleSwitch
			checkedType="darkTheme"
			checked={darkTheme}
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