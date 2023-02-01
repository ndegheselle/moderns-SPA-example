// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'bulma'
    ],
    modules: [
        '@pinia/nuxt',
    ],
    plugins: [
        {src: '~/plugins/prisma.js', mode: 'server'}
    ],
    privateRuntimeConfig: {
        jwt: {
            access_expire: process.env.JWT_EXPIRE,
            access_secret: process.env.JWT_KEY,
            refresh_expire: process.env.JWT_REFRESH_EXPIRE,
            refresh_secret: process.env.JWT_REFRESH_KEY,
        },
        db: process.env.MONGO_URI
    }
})
