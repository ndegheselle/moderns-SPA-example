import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie';
import autoLoad from '@fastify/autoload'

import * as dotenv from 'dotenv'

dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = fastify({
  logger: true
})

app.register(cors, {origin: process.env.ACCEPTED_DOMAIN});
app.register(cookie);
app.register(autoLoad, {
  dir: join(__dirname, 'plugins'),
  autoHooks: true,
  cascadeHooks: true,
})

app.listen({ port: process.env.PORT })