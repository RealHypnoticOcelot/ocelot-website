<script>
  import { enhance } from '$app/forms';
  import { page } from '$app/state';
  let { checked, checkedType, offContent, onContent } = $props();
  let newChecked = $derived(checked === 'true' ? 'false' : 'true');
</script>

<style>
  form {
    line-height: calc(var(--size, 4em) / 4);
  }
  span {
    cursor: pointer;
    display: grid;
    font-size: calc(var(--size, 4em) / 4);
    padding: calc(var(--size, 4em) / 8);
    margin-left: calc(var(--size, 4em) / 8);
    margin-right: calc(var(--size, 4em) / 8);
  }
  button {
    cursor: pointer;
    border: none;
    background-color: var(--bg-secondary);
    height: calc(var(--size, 4em) / 4);
    width: calc(var(--size, 4em) / 4);
    padding: calc(var(--size, 4em) / 4);
    display: grid;
    align-content: center;
    justify-content: center;
  }
</style>

{#if checked === 'true'}
<style>
  button {
    margin: 0 0 0 calc(var(--size, 4em) / 2);
    font-family: var(--onFont, var(--default-font))
  }
</style>
{/if}

<form
  method="POST" 
  action="/?/setCustomization&checkedType={checkedType}&value={newChecked}&redirect={page.url.pathname}"
  use:enhance={() => {
    // Optimistically update the theme
    document.documentElement.setAttribute(checkedType, newChecked.toString());
    
    return async ({ update }) => {
      // Apply the form response
      await update({ reset: false });
    };
  }}
>
  <label>
    <span
      style:background={checked === 'true' ? 'var(--color-highlight)' : 'var(--color-primary)'}>
      <button
        style:margin={checked === 'true' ? '0 0 0 calc(var(--size, 4em) / 2)': '0 calc(var(--size, 4em) / 2) 0 0'}
        style:font-family={checked === 'true' ? 'var(--onFont)': 'var(--default-font)'}
        type="submit"
        aria-label="Toggle"
      >
        {@html checked === 'true' ? onContent : offContent}
      </button>
    </span>
  </label>
</form>