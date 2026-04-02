<script lang="ts">
	import { page } from '$app/state';
	import ToggleSwitch from './ToggleSwitch.svelte';
	import logo from "$lib/assets/favicon.svg";
</script>

<style>
	header {
		display: grid;
		grid-template-columns: min-content auto min-content;
		background-color: var(--bg-primary);
		align-items: center;
		justify-items: center;
		padding: 1em 2em 1em 2em;
		margin: 0.5em auto 0.5em auto;
		width: var(--content-width);
	}
	header img {
		height: 5vh; /* Header image determines the entire header's size; maybe there's a better way to do this, but this works! */
	}
	header > * {
		display: flex;
		flex-wrap: wrap;
		padding: 0.5em;
	}
	nav a {
		padding: 1vw;
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
	<ToggleSwitch></ToggleSwitch>
</header>