import { Res } from "~/lib/type/type";

import Host from "./Host";
import Pagination from "./Pagination";
import QueryError from "../errorPage/QueryError";

interface HostDisplayProps {
  res: Res,
}

// displaying the response
export default function HostDisplay({res} : HostDisplayProps ) {
  //by default, don't show anything
  if (!res) {
    return
  }

  if (res.code >= 400){
    return <QueryError err={res.error}/>
  }

  return (
    <>
      <h3>
        Hosts
      </h3>
      <div>
        {`Results: ${res.result.total} Time: ${res.result.duration/1000}s`}
      </div>
      <div id="host-list">
        {res.result.hits.map((host: any) => {
          return <Host host = {host}/>
        })}
      </div>
      <br/>
      <hr/>
      <Pagination res={res}/>
    </>
  )
}
