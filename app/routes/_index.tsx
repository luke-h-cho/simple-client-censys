import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Header from "~/lib/components/header/Header";
import { CensysRequest, fetchCensys } from "~/lib/hooks/fetchAPIHooks";
import HostDisplay from "~/lib/components/body/HostDisplay";
import SearchBar from "~/lib/components/header/SearchBar";

// if necssary parameters exists, it will use params to append in URL to fetch the data it needs to render the search
export const loader = async ({ request }: LoaderFunctionArgs) => {
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
  
  return res;
}

// main component
export default function Index() {
  const res = useLoaderData<typeof loader>();

  return (
    <div id="home">
      <Header/>
      <SearchBar/>
      <hr/>
      <HostDisplay res={res}/>
    </div>
  );
}

