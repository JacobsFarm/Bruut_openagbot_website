import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: { 
        adapter: adapter({
            fallback: '404.html' 
        }),
        paths: {
            // De site staat op JacobsFarm.github.io/Bruut_openagbot_website/
            base: process.env.NODE_ENV === 'production' ? '/Bruut_openagbot_website' : '',
        },
        prerender: {
            // Dit voorkomt dat de build stopt als hij een link vindt die niet met /Bruut_openagbot_website begint
            handleHttpError: 'warn' 
        }
    },
    preprocess: [mdsvex()],
    extensions: ['.svelte', '.svx']
};

export default config;