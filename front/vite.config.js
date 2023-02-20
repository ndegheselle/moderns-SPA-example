import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Proxy : https://stackoverflow.com/questions/72753092/how-to-proxy-on-svelte-kit-in-dev-mode
// Dev : https://dev.to/xjamundx/adding-a-rest-api-to-your-vite-server-in-5-seconds-270g

export default defineConfig({
	plugins: [sveltekit()],
    /*
	server: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }*/
});