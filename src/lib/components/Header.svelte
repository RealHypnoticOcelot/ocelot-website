<script>
	import { page } from '$app/state';
	import ToggleSwitch from './ToggleSwitch.svelte';
	import logo from "$lib/assets/favicon.svg";
	import { fetchSVG } from '$lib/utils/fetchsvg';
	import { icons, info }  from '@iconify-json/ri';
	let { darkTheme, useHandwriting, navLinks } = $props();
</script>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		background-color: var(--default-background);
		align-items: center;
		justify-content: center;
		margin: var(--default-margin);
		width: var(--content-width);
		padding: var(--default-padding);
		/* position: sticky;
		top: 0; */
	}
	[itemprop=logo] {
		height: 5em;
	}
	header > * {
		display: flex;
		flex-wrap: wrap;
		padding: 0.5em;
	}
	nav {
		flex-grow: 1;
		justify-content: center;
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
	#skip:not(:focus), legend {
		position: absolute;
		transform: translateY(-100em);
		background-color: var(--bg-primary);
	}
	fieldset {
		justify-content: center;
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
	<nav data-sveltekit-keepfocus>
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