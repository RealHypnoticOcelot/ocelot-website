<script lang="ts">
	import { page } from '$app/state';
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
  @media print {
    footer {
      display: none;
    }
  }
</style>

<footer>
	<nav id="socialbuttons">
		{#each page.data.footer_buttons as link}
				<a
					href="{link.url}"
					target="_blank"
					aria-label={link.title}
				>
					{@html link.icon}
				</a>
		{/each}
	</nav>
	<nav id="footerlinks">
		{#each page.data.footer_links as link}
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
</footer>