# Run Application
Use docker to easily start the application
```
docker compose up --build
```

Then visit the application at http://localhost:5173

# Manual Setup
The project was built in `node v20.4.0` and using `pnpm` package manager.

To setup the frontend, navigate to the `frontend` directory and run `corepack pnpm install` to install the pacakages then run `corepack pnpm dev` to start.

To setup the backend, navigate to the `backend` directory and run `corepack pnpm install` and `corepack pnpm start:dev` to start.

# Description
The UI is a simple form that contains a `select dropdown`, `input` and `button`.
The `input field` is only for aesthetic, as mentioned in the requirements

I've prepared 2 branches to showcase my experience and skill

# main
The `main` branch contains my solution to how I interpreted the problem. The implementation is mostly done in the frontend and the backend is just to help with the request since we can't make a direct reuqest to the provided URL since it's a CORS issue.

The implemented solution tries to follow the requirements as close as possible. The parsing is handled by the native api `DOMParser` and `fetch` was used to handle http requests.

The solution is also implemented following a functional paradigm as this is the pradigm that React follows.

The backend exposes `http://localhost:3000/v1/search/:service/:page` where `service` parameter tells which search engine to use, `google` or `bing`. And `page` parameter tells which page to use.

The response of the backend is the raw HTML of the provided static pages.

# ideal-solution
The `ideal-solution` branch contains my solution to how I think it should be correctly implemented.

The parsing is offloaded to the backend, using nestjs, and the frontend's responsibility is purely for displaying.

The paradigm in the backend follows OOP since nestjs provides a lot of tools and resources for this approach.

In addition, I've added a few packages to help with the solution:

**Frontend stack**
- axios - Http request library. Preferred this over `fetch` because it's a "batteries included". Pairs great with react-query
- react-query - data fetching state management
- pnpm - Package manager
- Reactjs

**Backend stack**
- nestjs - API Framework
- cheerio - html parser.
- pnpm - Package manager
- axios
