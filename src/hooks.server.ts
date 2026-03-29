import type { Handle } from '@sveltejs/kit';

/**
 * Vereenvoudigde hooks.server.ts voor GitHub Pages (static hosting).
 * Paraglide taaldetectie gebeurt nu client-side via localStorage,
 * dus de paraglideMiddleware is niet meer nodig.
 * We vullen alleen de HTML placeholders in app.html in met een fallback.
 */
export const handle: Handle = ({ event, resolve }) => {
    return resolve(event, {
        transformPageChunk: ({ html }) =>
            html
                .replace('%paraglide.lang%', 'nl')
                .replace('%paraglide.dir%', 'ltr')
    });
};
