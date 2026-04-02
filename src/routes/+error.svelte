<!-- Still inherits from +layout.svelte! -->
<script>
	import { page } from '$app/state';
	const bodyFixer = `
	<style>
		body {
      margin: 0;
		}
	</style>
	`
</script>

<style>
  .error-container {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    scale: 1.5;
  }
  .error > * {
    margin: 0;
  }
</style>

{@html bodyFixer}

<div class="error-container">
  <div class="error">
    <h1>{page.status}</h1>
    <p>{page.error?.message ?? "Unknown Error"}</p>
  </div>
</div>