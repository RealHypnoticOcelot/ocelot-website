<!--
	Layout
	The contents here will be added to every page;
	prepended before @render, and appended after.
	This is a special page, not available at /layout
-->
<script>
	let { children } = $props();
</script>

<!-- +page.svelte is `@render`ed here -->
{@render children()}