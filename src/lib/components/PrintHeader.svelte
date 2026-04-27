<script>
	import { onMount } from 'svelte';
  import { formatDate } from "$lib/utils/formatDate";
  let date = $state(Date.now());

	onMount(() => {
		const interval = setInterval(() => {
			date = Date.now();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<style>
  header {
    display: none;
  }
  @media print {
    header {
      display: table;
      background-color: var(--default-background);
      margin: var(--default-margin);
      width: var(--content-width);
      padding: var(--default-padding);
    }
    header > * {
      text-align: center;
    }
  }
</style>

<header>
	<p><strong>This page was printed on {formatDate(date, true).dateString}</strong></p>
</header>