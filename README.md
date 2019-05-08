# Svelte + Sapper + GraphQL 🔥

> Svelte Starter with Sapper, GraphQL and Firebase Auth.

## Features

- [x] [Svelte](https://svelte.dev/)
- [x] [Sapper](https://sapper.svelte.dev/)
- [x] [GraphQL via Hasura's graphql-engine](https://github.com/hasura/graphql-engine/)
- [x] [Authentication via Firebase Auth](https://firebase.google.com/products/auth/)
- [x] [Adapted to work with Zeit Now v2](https://zeit.co/docs/v2/getting-started/introduction-to-now/)
- [x] [Uses Service Worker to Cache GraphQL Request](https://medium.com/@jono/cache-graphql-post-requests-with-service-worker-100a822a388a)

## Quick start

- Install dependencies: run `yarn` in project root
- For dev server: run `yarn dev` or `npm run dev`, from project root. The app should be running at: http://localhost:3000.
- To build frontend run: `yarn build` or `npm run build` from project root. Run `yarn start` or `npm start` to start app.

## Notes

- Repo was set up using my personal Hasura and Firebase configurations which is not included. So some setup is required for this repo to work for you.
- You will need to edit the `.env` file to add your credentials
- You also need to update the graphql directory with your own queries and mutations

## Deploy

- Uses [now-sapper](https://github.com/thgh/now-sapper)
- To deploy on Now v2: run `yarn deploy` or `npm run deploy`,

## TODO

- [ ] Add [TypeScript](https://github.com/Microsoft/TypeScript) when supported
