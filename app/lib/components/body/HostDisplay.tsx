import Host from "./Host";
import Pagination from "./Pagination";
import { SuccessRes} from "~/lib/type/type";

interface HostDisplayProps {
  res: SuccessRes | null,
  query: string
}

// displaying the response
export default function HostDisplay({res, query}: HostDisplayProps) {
  // if no response, don't show anything
  if (!res) {
    return;
  }
  
  // if the successful res is received, show the display using the data
  let result = res.result;
  return (
    <div id="search-result">
      <h3>
        Hosts
      </h3>
      <div>
        {`Results: ${result.total} Time: ${result.duration/1000}s`}
      </div>
      <div id="host-list">
        {result.hits.map((host: any, index: number) => {
          return <Host key={index} host = {host}/>
        })}
      </div>
      <br/>
      <hr/>
      <Pagination cursors={result.links} query={query}/>
    </div>
  )
}
