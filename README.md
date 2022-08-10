## KDDW Auth Service

This service is responsible for authentication and authorization from KDDW Users.

- The authentication is made by github using OAuth
- The authorization is made by the own Auth service

### Installation and Setup

- First clone this repo

```bash
git clone git@github.com:vitoivan/kddw-auth-service.git && cd kddw-auth-service
```

- Install dependencies (**with yarn plz**)

```bash
yarn install
```

- Run the local database with `docker-compose`

```bash
docker compose up
```

- Run the migrations

```bash
yarn run migrate
```

- Start the project

```bash
yarn run start:dev
```
