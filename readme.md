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
3. Add .env in root folder (generate your own jwt-secret: https://www.javainuse.com/jwtgenerator):   
    ```
    JWT_SECRET=[insert your jwt-secret here]
    ```
4. Add .env in `./packages/database` folder:
    ```
    DATABASE_URL="postgres://myuser:mypassword@localhost:5432/testing-db"
    ```
5. In root package.json run script to generate prisma types
   ``` shell
    pnpm run generate-types
    ```
6. In root package.json run script to start desired app:
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
- [x] Add turborepo/eslint
- [ ] Add Nuxt App
- [ ] Deploy and set up ci/cd
- [ ] To be added...
