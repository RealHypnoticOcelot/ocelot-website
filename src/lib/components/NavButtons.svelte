<script>
  import { randomPost } from "$lib/utils/getPost";
  import { toLongSlug } from "$lib/utils/toLongSlug";
  let { route, pageNumber, isFirstPage, isLastPage } = $props();
</script>

<style>
  nav {
    display: flex;
    justify-content: center;
    line-height: calc(var(--size, 4em) / 4);
    flex-wrap: wrap;
  }
  form {
    margin: calc(var(--size, 4em) / 8);
  }
  input {
    color: var(--color-primary);
    cursor: pointer;
    border: calc(var(--size, 4em) / 16) var(--color-primary) solid;
    box-sizing: content-box;
    background-color: transparent;
    padding: calc(var(--size, 4em) / 4);
    width: calc(var(--size, 4em) * 1.5);
    font-size: 16px;
    font-family: var(--default-font);
    border-radius: 0;
  }
  input:hover {
    background-color: var(--bg-secondary);
  }
  input:disabled {
    color: var(--color-tertiary);
  }
</style>

<nav>
  <form action={route.replace(pageNumber, pageNumber - 1)} data-sveltekit-keepfocus data-sveltekit-noscroll>
    <input type="submit" value="Previous" disabled={isFirstPage}/>
  </form>
  <form action={
    (() => {
    const [path, file] = randomPost();
    const postData = file.metadata;
    return toLongSlug(path, postData);
    })()
  }>
    <input type="submit" value="Random" />
  </form>
  <form action={route.replace(pageNumber, pageNumber + 1)} data-sveltekit-keepfocus data-sveltekit-noscroll>
    <input type="submit" value="Next" disabled={isLastPage}/>
  </form>
</nav>