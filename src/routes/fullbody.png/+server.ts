import { shuffle } from '$lib/utils/shuffle';
import { grid } from '$lib/utils/svg-grid';

// Keep in mind that the SVGs include a number of embedded images, which are not automatically resized.
// As a rule of thumb, keep your images at a resolution of 512x512 or below.
// More complex images will take longer to load, and this sort of thing can't be cached!
export async function GET() {
  let fullbodyImages = Object.values(import.meta.glob('$lib/assets/fullbody-images/*', { eager: true, import: 'default' }));
	let fullbodyImage = String(fullbodyImages[Math.floor(Math.random() * fullbodyImages.length)]);
  return new Response(
    null,
    {
      status: 302,
      headers: {
        location: fullbodyImage
      }
    }
  );
}