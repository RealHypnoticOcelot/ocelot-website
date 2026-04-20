Various Code Snippets that I might use for Frankensteining other code snippets!

<!-- TODO: Rewrite this, make aware of state updates -->
<!-- {#if useHandwriting == true}
<style>
	--font-url: {hypnofont}
	@font-face {
		font-family: "hypnoticocelot";
		src: var(--font-url);
		font-weight: normal;
		font-style: normal;
	}
	* {
		font-family: "hypnoticocelot";
	}
</style>
{/if} -->

`layout.server.ts`
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const useHandwriting = cookies.get('useHandwriting');

	return {
		useHandwriting: useHandwriting === 'true' // Return true as a value if useHandwriting is true
	};
}
`layout.svelte`
const useHandwriting = $derived(page.data?.useHandwriting ?? false)


`Background.svelte`
<script lang="ts">
	import { shuffle } from '$lib/utils/shuffle';
  import { grid } from '$lib/utils/grid';
  const svgSize = 128;
  const backgroundImages = import.meta.glob('$lib/assets/background-tiles/*', { eager: true, import: 'default' });
  const shuffledImages = grid(shuffle(Object.values(backgroundImages)), svgSize);
</script>

<svg version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	role="img"
	viewBox="0 0 {svgSize} {svgSize}"
	width="{svgSize}"
	height="{svgSize}">
  <desc>Tile Background</desc>

  <rect id="background" fill="#FFFFFF" x="0" ry="0" width="{svgSize}" height="{svgSize}"/>
    {#each shuffledImages as svgInfo}
      <image {...svgInfo} />
    {/each}
</svg>

`layout.server.ts`
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({fetch}) => {
  const imageTiles = await fetch("/background.svg")
  return {
    backgroundSVG: await imageTiles.text()
  };
};

`toggleswitch-old.svelte`
<script>
</script>

<style>
  label {
    line-height: calc(var(--size, 4em) / 4);
  }
  input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }
  span {
    display: grid;
    background-color: var(--color-primary);
    cursor: pointer;
    padding: calc(var(--size, 4em) / 8);
    transition: 0.2s;
    margin-left: calc(var(--size, 4em) / 8);
    margin-right: calc(var(--size, 4em) / 8);
  }
  span::before {
    transition: 0.2s;
    background: var(--bg-secondary);
    mask: var(--offImage, none) no-repeat center exclude, repeating-linear-gradient(black, white); /* Doesn't matter what the gradient is set to */
    display: grid;
    align-content: center;
    justify-content: center;
    content: var(--offText, "");
    height: calc(var(--size, 4em) / 4);
    width: calc(var(--size, 4em) / 4);
    font-size: calc(var(--size, 4em) / 4);
    font-family: "Liberation Sans", "Helvetica Neue", "Noto Sans", "Open Sans", sans-serif;
    padding: calc(var(--size, 4em) / 8); /* Should be 2x width/height */
    margin: 0 calc(var(--size, 4em) / 2) 0 0;
  }
  input:checked + span {
    background-color: var(--color-highlight);
  }
  input:checked + span::before {
    mask: var(--onImage, none) no-repeat center exclude, repeating-linear-gradient(black, white);
    content: var(--onText, "");
    margin: 0 0 0 calc(var(--size, 4em) / 2);
    font-family: var(--onFont)
  }
</style>

<label>
  <input type="checkbox" role="switch"/>
  <span></span>
</label>