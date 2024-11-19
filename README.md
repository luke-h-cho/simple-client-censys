# Welcome to Simple Client Censys!

This service is a **simple Remix client** that implements a search functionality as outlined in the [project requirements](https://app2.greenhouse.io/tests/bbd476491d5c5ba70b3d0e65de12c200?utm_medium=email&utm_source=TakeHomeTest).

## Features

1. **Main Search Bar**
   - Located on the home page.
   - Fetches data from the [Censys Search APIv2](https://search.censys.io/api)'s `/v2/hosts/search` endpoint based on user input.

2. **Host List Display**
   - Results are rendered in a child component upon a successful query.
   - Includes **pagination**, using a `cursor` query parameter to navigate through results while maintaining the original `q` parameter.

3. **Error Handling**
   - If any API request fails, an error component is displayed instead of the host list.

4. **Minimal Styling**
   - Basic styling only, as development time was primarily spent on functionality and learning the Remix framework.

<br/>

## Testing Instructions

### Unit Testing

Run the following command to execute unit tests:

```sh
npm test
```

- The test results, including coverage percentage, will be displayed.
- **Known Issue:** Some files fail due to incompatibilities with Remix utilities in Jest:
  - `route/_index.test.tsx`
  - `root.test.tsx`
  - `Pagination.test.tsx`
  - `SearchBar.test.tsx`
  
  For more details, see this [GitHub issue](https://github.com/remix-run/remix/issues/8481#issuecomment-2425051833).

- **Planned Improvement:** Convert tests to **Vitest** instead of Jest.
---
### Manual Testing

#### Prerequisites

1. Create a `.env` file with the following variables:
    - **Required:** 
        - `CENSYS_API_ID`
        - `CENSYS_API_KEY`  
          Obtain these from your [Censys account page](https://search.censys.io/account/api).
    - **Optional:** 
        - `CENSYS_SEARCH_API_BASE_URL`
        - `CENSYS_SEARCH_HOST_URL_V2`

2. Start the development server:

    ```sh
      npm run dev
    ``` 
3. Access the application at the provided localhost URL.
---
### Functionality Walkthrough
1. **Initial Query**
   - Navigate to the home page to see the search bar.
   - Submit a query to trigger API calls.

   Based on the response:
   - **Error Response (e.g., invalid query, invalid credentials):**
     - An error boundary page with an appropriate message is displayed.
   - **Successful Response:**
     - A list of hosts is displayed beneath the search bar.
     - The list includes pagination buttons.

2. **Error Handling Scenarios**
   - **Internal Error:** 
     - Modify the fetch URL in `getCensys.ts` to simulate a failed API call.
   - **Invalid Query:** 
     - Use an invalid string such as `{}{}{|}{|#$%#$@}%{@|}`.  
       - API response: `422 Unprocessable Entity` (should be `400 Bad Request` per [API docs](https://search.censys.io/api#/hosts/searchHosts)).
   - **Invalid Credentials:** 
     - Use incorrect `CENSYS_API_ID` and `CENSYS_API_KEY`.
       - API response: `401 Unauthorized`.
   - **Rate Limiting:** 
     - Not explicitly tested, but similar error handling applies.

3. **Pagination**
   - Use `Next` and `Prev` buttons to navigate results:
     - The `Prev` button is disabled on the first page (no previous cursor - `Next` button behaves the same at the last page).
     - Manipulate the `cursor` parameter in the developer console to test error handling for invalid cursor values (`422 Unprocessible Entity`).



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
