// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'bulma'
    ],
    modules: [
        '@pinia/nuxt',
        '@sidebase/nuxt-auth'
    ],
    plugins: [
        {src: '~/plugins/prisma.js', mode: 'server'}
    ],
    privateRuntimeConfig: {
        db: process.env.MONGO_URI
    }
})
