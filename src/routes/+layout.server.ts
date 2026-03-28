import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({fetch}) => {
  const imageTiles = await fetch("/background.svg")
  return {
    backgroundSVG: "data:image/svg+xml;base64," + btoa(await imageTiles.text()) // SVG to Base64
  };
};