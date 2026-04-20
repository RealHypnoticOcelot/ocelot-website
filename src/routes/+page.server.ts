import { redirect } from '@sveltejs/kit';

export const actions = {
  setCustomization: async ({ url, cookies }) => {
    const checkedType = url.searchParams.get('checkedType') ?? "null";
    const theme = url.searchParams.get('value') ?? "null";
    const redirectTo = url.searchParams.get('redirect');

    cookies.set(checkedType, theme, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: true,
      secure: true,
      sameSite: 'lax'
    });
    
    redirect(303, redirectTo || '/');
  }
};