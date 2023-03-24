# Tech stack

Proxy from frontend to backend.

- frontend : SvelteKit
    - Style : Bulma
- backend : Fastify
    - ORM : Prisma

# Setup a replica mongodb database

## Windows

Tutorial : https://adelachao.medium.com/create-a-mongodb-replica-set-in-windows-edeab1c85894

## Linux

Open the `mongosh` cmd on the db server :
```
docker-compose exec db /bin/sh
mongosh
```
Use this setup :
```js
config = { "_id": "s0", "members": [ { "_id": 0, "host": "db:27017" }] }
rs.initiate(config)
```

# Docker

Start :
```
docker-compose up
```

Build (after Dockerfile modif) :
```
docker-compose build
```

Clean docker :
```
docker-compose down -v --rmi all --remove-orphans
```

Docker cmd :
```
docker-compose exec [nom-container] /bin/bash
```

# Todos

## Plugin system

Make it easy for an external dev to add new plugin (set of routes/models for api and pages/api requests for front) :
- Fastify : using patterns and regroup in folders (using `dirNameRoutePrefix`, `matchFilter`, ...)
- SvelteKit : simply put everything in routes ? Or try to understand how embeded projects are made.
    - Working but not fan : https://github.com/sveltejs/kit/issues/6031

## Reverse proxy

Use nginx reverse proxy
- Redirect API