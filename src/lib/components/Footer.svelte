<script lang="ts">
	import { page } from '$app/state';
	let { footerButtons, footerLinks, footerText } = $props();
</script>

<style>
	footer {
		display: flex;
		flex-direction: column;
		background-color: var(--default-background);
		align-items: center;
		justify-content: center;
		margin: var(--default-margin);
		width: var(--content-width);
		min-height: 5vh;
		padding: var(--default-padding);
	}
	footer > * {
		display: flex;
		flex-wrap: wrap;
		padding: 0.5em;
	}
	nav a {
		padding: 0 0.5em 0 0.5em;
		text-decoration: none;
	}
	a :global {
		svg {
			vertical-align: baseline;
      width: 3em;
      height: 3em;
		}
	}
	#socialbuttons {
		justify-content: space-evenly;
		width: 100%;
	}
	#socialbuttons a {
		color: var(--color-primary);
	}
	#footerlinks > *:not(:last-child) {
		border-right: 0.1em solid var(--color-highlight);
	}
	cite {
		display: none;
		font-style: normal;
	}
	#footerText {
		display: block;
	}
  @media print {
    footer {
      display: none;
    }
  }
</style>

<footer>
	<nav id="socialbuttons">
		{#each footerButtons as link}
				<a
					href="{link.url}"
					target="_blank"
					aria-label={link.title}
				>
					{@html link.icon}
				</a>
		{/each}
	</nav>
	<nav id="footerlinks" data-sveltekit-keepfocus>
		{#each footerLinks as link}
			<a
				href="/{link.slug ?? link.title.toLowerCase()}"
				aria-current={page.url.pathname.startsWith(`/${link.slug ?? link.title.toLowerCase()}`) ? 'page' : null}
			>
				{link.title ?? ""}
				{#if link.icon}
					{@html link.icon}
				{/if}
			</a>
		{/each}
	</nav>
	<p id="footerText">
		{#if footerText}
			{#if footerText.attribution}
				<em><q title={"From " + footerText.attribution}>{footerText.text}</q></em><cite>{" - " + footerText.attribution}</cite>
			{:else}
				<em>{footerText.text}</em>
			{/if}
		{/if}
	</p>
</footer>