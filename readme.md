## Fullstack todos

Idea of this project to create the same app on different fullstack framework.

## Installation

1. run docker-compose:
   ``` shell
   docker compose -f ./docker-compose.yml -p fullstack-todos up -d
    ```
2. Run install in root folder:
    ``` shell
    pnpm install
    ```
3. Cd to desired app (example: apps/next):
    ``` shell
    cd apps/next
    ```
4. Run install again:
    ``` shell
    pnpm install
    ```
5. Add .env in root folder (generate your own jwt-secret: https://www.javainuse.com/jwtgenerator):   
    ```
    DATABASE_URL="postgres://myuser:mypassword@localhost:5432/testing-db"
    JWT_SECRET=[insert your jwt-secret here]
    ```
6. In root package.json run script to generate prisma types
   ``` shell
    pnpm run generate-types
    ```
7. In root package.json run script to start desired app:
   ``` shell
    pnpm run app:next-dev
    ```

## Rules

1. Every app will use the same DB with prisma ORM
2. If it's possible, every app should use tailwind in order to share styles between apps
3. UI npm packages should be avoided

## Roadmap

- [x] Add Next.js App
- [x] Add SvelteKit App 
- [ ] Deploy and set up ci/cd
- [ ] Add Signal App
- [ ] Add Nuxt App 
- [ ] To be added...
