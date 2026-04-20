<script>
  let { route, pageNumber, isFirstPage, isLastPage } = $props();
</script>

<style>
  nav {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    line-height: calc(var(--size, 4em) / 4);
  }
  form {
    margin-left: calc(var(--size, 4em) / 8);
    margin-right: calc(var(--size, 4em) / 8);
  }
  input {
    cursor: pointer;
    border: calc(var(--size, 4em) / 16) var(--color-primary) solid;
    box-sizing: content-box;
    background-color: transparent;
    padding: calc(var(--size, 4em) / 4);
    width: calc(var(--size, 4em) * 1.5);
    font-size: 16px;
    font-family: var(--default-font);
  }
  input:hover {
    background-color: var(--bg-secondary);
  }
</style>

<nav>
{#if !isFirstPage}
  <form action={route.replace(pageNumber, pageNumber - 1)} data-sveltekit-keepfocus data-sveltekit-noscroll>
    <input type="submit" value="Previous" />
  </form>
{/if}
{#if !isLastPage}
  <form action={route.replace(pageNumber, pageNumber + 1)} data-sveltekit-keepfocus data-sveltekit-noscroll>
    <input type="submit" value="Next" />
  </form>
{/if}
</nav>