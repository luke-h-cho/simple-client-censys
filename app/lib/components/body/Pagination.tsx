import { Form } from "@remix-run/react";

export default function Pagination({ res } : any){
  return (
    <Form method="get">
      <input defaultValue={(document.getElementById("query") as HTMLInputElement).value} name="q" hidden={true}/>
      <button name="cursor" type="submit" aria-label="previous" value={res.result.links.prev} disabled={!!!res.result.links.prev}>
        Prev
      </button>
      <button name="cursor" type="submit" aria-label="next" value={res.result.links.next}>
        Next
      </button>
    </Form>
  )
}
