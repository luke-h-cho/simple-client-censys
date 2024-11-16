# Welcome to Simple Client Censys!

Based on the requirements [here](https://app2.greenhouse.io/tests/bbd476491d5c5ba70b3d0e65de12c200?utm_medium=email&utm_source=TakeHomeTest), this service is a simple Remix client that loads the main search bar in the main home page. 

Based on the search query, response from [Censys Search APIv2](https://search.censys.io/api)'s `/v2/hosts/search` endpoint is processed and hosts are listed in the child component.

When the host list is rendered, it also includes pagination capability, which appends a query param `cursor` to fetch the response, while keeping the current query param `q` as is in the URL.

Not much CSS is added to the application, since I ended up spending a lot of time on the functionality and familiarizing with Remix framework.

## Testing Step

Unfortunately, I could not add either unit test and functional test

But, here is the step where you can test the functionality with the application

1. in the terminal, run the dev server:
```
npm run dev
```
2. main page will display a title and below is a search bar
3. 

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
