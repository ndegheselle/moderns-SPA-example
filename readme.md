# Tech stack

Proxy from frontend to backend.

- frontend : SvelteKit
    - Style : Bulma
- backend : Fastify
    - ORM : Prisma

# Setup a replica mongodb database

## Windows

Tutorial : https://adelachao.medium.com/create-a-mongodb-replica-set-in-windows-edeab1c85894
Use 

## Linux

Open the `mongosh` cmd on the db server :
```
docker-compose exec db /bin/sh
mongosh
```
Use this setup :
```js
rs.initiate()
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

## Silence
Start with :
```
docker-compose up -d && docker-compose logs api -f
```

# Prisma

Push to database : 
```
npx prisma db push
```

## Interface

Go to the API container :
```
docker-compose exec api /bin/sh
```

Start prisma studio :
```
npx prisma studio
```

## Default user

`test` hashed :
```
$2b$10$DCmF8dlyil4vK5CUSzUgeO5Uoip1DRvTFaGeUXHgxElikdGbqguwu
```