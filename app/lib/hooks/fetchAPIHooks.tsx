export interface CensysRequest { 
  query: string,
  cursor: string | null
}

const BASE_URL = "https://search.censys.io";
const SEARCH_ENDPOINT_V2 = "/api/v2/hosts/search";

// setting up valid headers for the API call
const basicAuth = 'Basic ' + btoa(`${process.env.CENSYS_API_ID}:${process.env.CENSYS_API_KEY}`);
const commonHeader = new Headers({
  "Authorization": basicAuth,
  "Content-Type": "application/json;v1",
  "Connection": "keep-alive",
  "Accept": "*/*",
  "Accept-Encoding": "gzip, deflate, br"
});

// calling the Censys API by configuring required headers and URL
/**
 * @param query 
 * @param cursor 
 * @returns 
 */
export const fetchCensys = async ({query, cursor}: CensysRequest) => {
  // appending two main query params, q and cursor (if exists), for the scope
  let url = `${BASE_URL}${SEARCH_ENDPOINT_V2}?q=123123`;

  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  // calling censys api
  try{
    const res = await fetch(url, {
      headers: commonHeader,
    });

    if (!res.ok){
      // if the response is 400s
      console.error("failed res");
      throw new Error("censys search failed with code " + res.statusText);
    }

    // if the response is successful
    console.log("success res");
    return await res.json();
  } 
  catch(err) {
    // if there is error attempting to fetch
    console.error("error in fetching", err);
  }
}
