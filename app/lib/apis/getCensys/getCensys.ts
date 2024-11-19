export interface CensysRequest { 
  query: string,
  cursor: string | null
}

// including fallback for easy testing
const BASE_URL = process.env.CENSYS_SEARCH_API_BASE_URL || "https://search.censys.io";
const SEARCH_ENDPOINT_V2 = process.env.CENSYS_SEARCH_HOST_URL_V2 || "/api/v2/hosts/search";

// setting up valid headers for the API call
const basicAuth = 'Basic ' + btoa(`${process.env.CENSYS_API_ID}:${process.env.CENSYS_API_KEY}`);
const commonHeader = {
  "Authorization": basicAuth,
  "Content-Type": "application/json;v1",
  "Connection": "keep-alive",
  "Accept": "*/*",
  "Accept-Encoding": "gzip, deflate, br"
};

// calling the Censys API by configuring required headers and URL
/**
 * @param query 
 * @param cursor 
 * @returns 
 */
export const fetchCensys = async ({query, cursor}: CensysRequest) => {
  // appending two main query params, q and cursor (if exists), for the scope
  let url = `${BASE_URL}${SEARCH_ENDPOINT_V2}?q=${query}`;

  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  // calling censys api
  try {
    const res = await fetch(url, {
      headers: new Headers(commonHeader),
    });

    if (!res.ok){
      // if the response is 400s
      console.error("failed res with status code ", res.status);
    } else {
      // if the response is successful
      console.log("success res");
    }

    // return the response - if there is an error, it will be handled in the route
    return await res.json();
  } catch(err) {
    // if there is error attempting to fetch
    console.error("error in fetching for some reason: ", err);
    throw err;
  }
}
