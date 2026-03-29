import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: { 
        adapter: adapter({
            fallback: '404.html' 
        }),
        paths: {
            // Dit zorgt dat de site werkt op JacobsFarm.github.io/website/
            base: process.env.NODE_ENV === 'production' ? '/website' : '',
        },
        prerender: {
            // Dit voorkomt dat de build stopt als hij een link vindt die niet met /website begint
            handleHttpError: 'warn' 
        }
    },
    preprocess: [mdsvex()],
    extensions: ['.svelte', '.svx']
};

export default config;