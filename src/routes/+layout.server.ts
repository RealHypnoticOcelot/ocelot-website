import type { LayoutServerLoad } from './$types';
import { shuffle } from '$lib/utils/shuffle';

export const load: LayoutServerLoad = () => {
  const backgroundImages = import.meta.glob('$lib/assets/background-tiles/*', { eager: true, import: 'default' });
  return {
		randomTiles: shuffle(Object.values(backgroundImages))
  };
};