# Tech stack

Proxy from frontend to backend.

- frontend : SvelteKit
    - Style : Bulma
- backend : Fastify
    - ORM : Prisma

# Setup a replica mongodb database

On windows : https://adelachao.medium.com/create-a-mongodb-replica-set-in-windows-edeab1c85894

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
