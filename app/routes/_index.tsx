import { LoaderFunctionArgs } from "@remix-run/node";
import { isRouteErrorResponse, useLoaderData, useNavigation, useRouteError, useSearchParams } from "@remix-run/react";

import HostDisplay from "~/lib/components/body/HostDisplay/HostDisplay";
import { CensysRequest, fetchCensys } from "~/lib/apis/getCensys/getCensys";
import { SuccessRes } from "~/lib/type/type";

// if necssary parameters exists, it will use params to append in URL to fetch the data it needs to render the search
export const loader = async ({ request }: LoaderFunctionArgs):Promise<SuccessRes | null> => {
  const { searchParams } = new URL(request.url);

  // if there is no required param "q" (initial render), return empty data
  if(!searchParams.has("q")){
    return null;
  }

  const query = searchParams.get("q") || "";
  const cursor = searchParams.get("cursor");
  
  const requestBody: CensysRequest = {
    query,
    cursor,
  };

  let res;
  // call the api, based on query params
  res = await fetchCensys(requestBody);

  // if the failed response is returned
  if (res.code >= 400) {
    throw new Response(`Oops! ${res.status} with status code of ${res.code}! Failed the query due to ${res.error}.`, {status: res.code})
  }
  
  return res;
}

// main component
export default function Index() {
  const res : SuccessRes | null = useLoaderData<typeof loader>();
  const [ searchParams ] = useSearchParams()
  const query = searchParams.get("q") || "";
  const transition = useNavigation();
  const isLoading = transition.state === "loading";

  return (
    <div id="home">
      { isLoading ? 
        <div id="loading"> Searching... </div> :
        <HostDisplay res={res} query={query}/>
      }
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  
  // when loader returns the error response
  if (isRouteErrorResponse(error)){
    return (
      <div id="error">
        {error.data}
      </div>
    )
  }

  // any other errors
  return (
    <div id="error">
      {"Unknown Internal Error: " + (error as Error).message}
    </div>
  )

}

