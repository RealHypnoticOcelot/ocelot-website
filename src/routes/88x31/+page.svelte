<script>
    import { page } from '$app/state';

  let { data } = $props();
  const linkButtons = import.meta.glob('$lib/assets/88x31/*', { eager: true, import: 'default' });
</script>

<style>
  .buttons {
    display: flex;
    flex-wrap: wrap;
  }
  img {
    margin: 0.25em;
    width: 88px;
    height: 31px;
    image-rendering: pixelated;
    transition: 0.15s;
    box-sizing: border-box;
  }
  img:hover{
    transform: scale(2);
  }
  @keyframes highlighted {
    from {
      outline: 0.5em var(--color-highlight) solid;
    }
    to {
      outline: transparent;
    }
  }
  :target > img {
    animation: highlighted 1.5s ease-out;
  }
</style>

<main id="content">
  <h1>88x31</h1>
  <hr>
  <p>Feel free to use <a href={"#" + data.thisSite}>my button</a> anywhere!</p>
  <div class="buttons">
  <!-- A bit crude, but it works! -->
  {#each Object.keys(linkButtons) as button}
    {@const buttonFQDN = button.substring(button.lastIndexOf('/') + 1, button.lastIndexOf('.')).replace("__", ".")}
    {#if buttonFQDN.startsWith('@')}
      <a href={ 'https://' + buttonFQDN.substring(1)} id={buttonFQDN.substring(1)}>
        <img src={linkButtons[button] ? linkButtons[button].toString() : "/"} alt={buttonFQDN.substring(1)}>
      </a>
    {:else}
      <img id={buttonFQDN} src={linkButtons[button] ? linkButtons[button].toString() : "/"} alt={buttonFQDN.replace("--", " ")}>
    {/if}
  {/each}
  </div>
</main>