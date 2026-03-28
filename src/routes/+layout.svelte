<!--
	Layout
	The contents here will be added to every page;
	prepended before @render, and appended after.
	This is a special page, not available at /layout
-->
<script>
	let { data, children } = $props();
	import { page } from '$app/state';
	import hypnofont from '$lib/assets/Hypnoticocelot-Regular.otf';	

	const backgroundCSS = `
	<style>
		body {
			background-image: url("${page.data?.backgroundSVG ?? ''}");
			background-size: 10vw;
			background-repeat: repeat;
			background-color: #15e209;
		}
	</style>
	`

  const metadata = $derived(data?.metadata ?? {});
	// Generated tags! Derived from the closest layout.ts or page.ts that defines them, uses defaults if not defined
	// @ts-ignore
	const extraMetadata = $derived(data?.extraMetadata ?? {});
	// Tags that should be appended to the existing metadata
</script>

<svelte:head>
	<title>{metadata.title}</title>
  {#each metadata.meta || [] as meta}
		<meta {...meta} />
	{/each}
	{#each metadata.link as link}
		<link {...link} />
	{/each}
	{#each extraMetadata.meta as meta}
		<meta {...meta} />
	{/each}
	{#each extraMetadata.link as link}
		<link {...link} />
	{/each}
</svelte:head>

{@html backgroundCSS}
<!-- +page.svelte is `@render`ed here -->
{@render children()}