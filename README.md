# Welcome to Simple Client Censys!

Based on the requirements [here](https://app2.greenhouse.io/tests/bbd476491d5c5ba70b3d0e65de12c200?utm_medium=email&utm_source=TakeHomeTest), this service is a simple Remix client that loads the main search bar in the main home page. 

Based on the search query, response from [Censys Search APIv2](https://search.censys.io/api)'s `/v2/hosts/search` endpoint is processed and hosts are listed in the child component.

When the initial search is successful and the host list is rendered, it also includes pagination capability, which appends a query param `cursor` to fetch the response, while keeping the current query param `q` as is in the URL.

If any of the fetching call has a problem and return an error or failed response, it will show error component, instead of the host list.

Not much CSS is added to the application, since I ended up spending a lot of time on the functionality and familiarizing with Remix framework.

## Testing Step

### For unit test, run the command below to run:
  ```shellscript
  npm test
  ```
  - the command will run the test and display the testing result with a line coverage %, etc
  - currently, due to some unresolved bug, trying to import remix's utilities with Jest, some files will fail (`route/_index.test.tsx`, `root.test.tsx`, `Pagination.test.tsx`, `SearchBar.text.tsx`)
    [github issue](https://github.com/remix-run/remix/issues/8481#issuecomment-2425051833)
    - Solution/To-do -> To convert unit tests into Vitest, instead of Jest

### No functional test, but here is the step where you can test the functionality manually

  1. in the terminal, run the dev server:
  
  ```shellscript
  npm run dev
  ```

  2. Go to the localhost that the application is running - home page will display a title and below is a search bar.

  3. Application will behave different based on the initial query:
      1. if the fetch somehow fails and run into an error without a valid response:
          - should display the error boundary page of internal error and its message
          - to test this, manipulate the URL address in the code, where the fetch is being called (getCensys.ts)

      2. if the fetch request is made and error response is returned:
          - should display the error boundary of failed response, along with the message
          - list of all error types:
              1. returned response is that query is invalid:
                  - to test this, use `{}{}{|}{|#$%#$@}%{@|}{@|}{(*|}(%^` query to trigger invalid query error
                      - this displays the code 422 (I think it should be 400, according to [API doc](https://search.censys.io/api#/hosts/searchHosts))
              2. returned response is that basic token is invalid:
                  - to test this, make sure the basic auth token (CENSYS_API_ID and CENSYS_API_KEY) is invalid
                      - this displays the code 401
              3. I do not know or want to trigger the too many request error - but if the response is received, it will behave the same as above errors

      3. if the fetch request is made and success response is returned:
          - should display HostDisplay.tsx below the search bar with the list of Hosts
          - HostDisplay component should include pagination button
              - Prev button is disabled, because prev cursor does not exist in the initial search

  4. After initial query, it will display the list of Hosts, and the buttons at the bottom for pagination. Click the pagination button `Prev` and `Next`, to navigate the result of the query.
      - if the cursor value is invalid, it will display an error component, similar to other errors from failed API responses:
          - to test this, manipulate the cursor element's value assigned to pagination button manually, using dev tool
              - this displays the code 422

## Development

Run the dev server:

```sh
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
