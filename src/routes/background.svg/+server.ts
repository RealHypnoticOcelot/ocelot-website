import { shuffle } from '$lib/utils/shuffle';
import { grid } from '$lib/utils/svg-grid';

// Keep in mind that the SVGs include a number of embedded images, which are not automatically resized.
// As a rule of thumb, keep your images at a resolution of 512x512 or below.
// More complex images will take longer to load, and this sort of thing can't be cached!
export async function GET() {
  const svgSize = 512; // Kind of inconsequential, on account of the whole infinitely scaling thing
  const backgroundImages = import.meta.glob('$lib/assets/background-tiles/*', { eager: true, import: 'default', query: '?inline' });
	// Must be inline(data URIs), because external requests aren't loaded inside of SVGs
  const shuffledImages = grid(shuffle(Object.values(backgroundImages)), svgSize, 1);
	return new Response(
		`
    <svg version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	role="img"
	viewBox="0 0 ${svgSize} ${svgSize}"
	width="${svgSize}"
	height="${svgSize}">
  <desc>Tile Background</desc>

  <rect id="background" fill="transparent" x="0" ry="0" width="${svgSize}" height="${svgSize}"/>
    ${shuffledImages}
  </svg>
    `.trim(),
		{
			headers: {
				'Content-Type': 'image/svg+xml'
			}
		}
	);
}