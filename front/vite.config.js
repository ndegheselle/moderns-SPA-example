import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import * as path from 'path';

// Proxy : https://stackoverflow.com/questions/72753092/how-to-proxy-on-svelte-kit-in-dev-mode
// Dev : https://dev.to/xjamundx/adding-a-rest-api-to-your-vite-server-in-5-seconds-270g

export default defineConfig({
	plugins: [sveltekit()],
    resolve: {
        alias: {
            // these are the aliases and paths to them
            '@components': path.resolve('./src/lib/components'),
            '@lib': path.resolve('./src/lib'),
        }
    },
    server: {
        host: "0.0.0.0",
        watch: {
            usePolling: true
        }
    }
    /*
	server: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }*/
});