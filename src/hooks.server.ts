import type { Handle } from '@sveltejs/kit';

const extraHeaders = {
  'x-clacks-overhead': 'GNU Terry Pratchett'
}

export const handle: Handle = async ({ event, resolve }) => {
  const theme = event.cookies.get('darkTheme') || false;
  const useHandwriting = event.cookies.get('useHandwriting') || false;
  // @ts-expect-error
  event.locals.theme = theme;
  // @ts-expect-error
  event.locals.useHandwriting = useHandwriting;
	const response = await resolve(event, { 
    preload: ({ type }) => type === 'font'  || type === 'js' || type === 'css',
    transformPageChunk: ({ html }) => {
      html = html.replace('darktheme=""', `darktheme="${theme}"`);
      html = html.replace('usehandwriting=""', `usehandwriting="${useHandwriting}"`);
      return html
    }
  });
  Object.entries(extraHeaders).forEach(
    ([header, value]) => response.headers.set(header, value)
  ) 

  return response;
};