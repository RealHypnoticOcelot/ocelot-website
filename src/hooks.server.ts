import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const theme = event.cookies.get('darkTheme') || 'system';
  const useHandwriting = event.cookies.get('useHandwriting') || false;
  event.locals.theme = theme;
  event.locals.useHandwriting = useHandwriting;
	return resolve(event, { 
    preload: ({ type }) => type === 'font'  || type === 'js' || type === 'css',
    transformPageChunk: ({ html }) => {
      html = html.replace('darktheme=""', `darktheme="${theme}"`);
      html = html.replace('usehandwriting=""', `usehandwriting="${useHandwriting}"`);
      return html
    }
  }); 
};