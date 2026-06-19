<script lang="ts">
	import { page } from '$app/state';
	let { footerButtons, footerLinks, footerText } = $props();
</script>

<style>
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 5dvh;
	}
	footer > * {
		display: flex;
		flex-wrap: wrap;
	}
	footer > *:first-child {
		margin-top: 1em;
	}
	footer > *:last-child {
		margin-bottom: 1em;
	}
	a :global {
		svg {
			vertical-align: baseline;
      width: 3em;
      height: 3em;
		}
	}
	#socialButtons {
		justify-content: space-evenly;
		width: 100%;
	}
	#socialButtons a {
		color: var(--color-primary);
	}
	#footerLinks a {
		padding: 0 1em 0 1em;
		margin: 0.5em 0 0.5em 0;
		text-decoration: none;
	}
	#footerLinks > *:not(:last-child) {
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
	<nav id="socialButtons">
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
	<nav id="footerLinks" data-sveltekit-keepfocus>
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