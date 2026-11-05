<!-- Still inherits from +layout.svelte! -->
<script>
	import { page } from '$app/state';
</script>

<style>
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
  }
  .error * {
    margin: 0;
    font-family: var(--default-font);
    color: var(--color-primary);
  }
  /* .error button, .error input {
    cursor: pointer;
    border: none;
    width: 10em;
    color: var(--bg-primary);
    background-color: var(--color-primary);
    margin: 0.25em;
  } */
</style>

<div class="error">
  <h1>{page.status}</h1>
  <p>{page.error?.message ?? "Unknown Error"}</p>
</div>