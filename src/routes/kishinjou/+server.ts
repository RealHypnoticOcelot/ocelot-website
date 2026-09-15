export async function GET() {
  let backgroundImages = Object.values(import.meta.glob('$lib/assets/kishinjou-images/*', { eager: true, import: 'default' }));
	let backgroundImage = String(backgroundImages[Math.floor(Math.random() * backgroundImages.length)]);
  return new Response(
    null,
    {
      status: 302,
      headers: {
        location: backgroundImage
      }
    }
  );
}