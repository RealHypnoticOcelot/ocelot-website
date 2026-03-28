<!-- Still inherits from +layout.svelte! -->
<script lang="ts">
	import { page } from '$app/state';
</script>

<style>
  :global(body) {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: sans-serif;
    padding: 2em;
    background-color: #000;
  }
  .error > * {
    margin: 0;
    font-family: sans-serif;
    color: #ffffff;
  }
</style>

<div class="error">
  <h1>{page.status}</h1>
  <p>{page.error?.message ?? "Unknown Error"}</p>
</div>