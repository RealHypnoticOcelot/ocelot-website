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
      display: flex;
      justify-content: center;
    }
    header > * {
      text-align: center;
    }
  }
</style>

<header>
	<p><strong>This page was accessed on {formatDate(date, true).dateString}</strong></p>
</header>