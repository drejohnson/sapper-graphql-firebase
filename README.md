# Svelte + Sapper + GraphQL 🔥

> Svelte Starter with Sapper, GraphQL and Firebase Auth.

## Features

- [x] [Svelte](https://svelte.dev/)
- [x] [Sapper](https://sapper.svelte.dev/)
- [x] [RxJS](https://rxjs.dev/)
- [x] [GraphQL via Hasura's graphql-engine](https://github.com/hasura/graphql-engine/)
- [x] [Authentication via Firebase Auth](https://firebase.google.com/products/auth/)
- [x] [Uses Service Worker to Cache GraphQL Request](https://medium.com/@jono/cache-graphql-post-requests-with-service-worker-100a822a388a)

## Quick start

- Install dependencies: run `yarn` in project root
- For dev server: run `yarn dev` or `npm run dev`, from project root. The app should be running at: http://localhost:3000.
- To build frontend run: `yarn build` or `npm run build` from project root. Run `yarn start` or `npm start` to start app.

## Notes

- Repo was set up using my personal Hasura and Firebase configurations which is not included. So some setup is required for this repo to work for you.
- You will need to edit the `.env` file to add your credentials
- You also need to update the graphql directory with your own queries and mutations
- To run/test in docker locally run `docker run -p 3000:3000 -it <IMAGE> sh`. e.g. `docker run -p 3000:3000 -it gcr.io/your_project/your_service:54bxr7g9 sh`, then from inside image run `node __sapper__/build`. Now open browser to `localhost:3000`

## Deploy

- Uses [Cloud Run](https://cloud.google.com/run/)
- To deploy on Cloud Run: run `yarn deploy` or `npm run deploy`,

## TODO

- [ ] Move the `src/svql` directory into it's own repo and publish as a lightweight graphql client for `svelte` on npm
- [ ] Add [TypeScript](https://github.com/Microsoft/TypeScript) when supported
