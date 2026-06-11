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