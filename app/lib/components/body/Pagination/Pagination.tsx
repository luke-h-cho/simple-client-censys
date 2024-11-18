import { Form } from "@remix-run/react";

interface Cursors {
  prev: string,
  next: string
}
interface PaginationProps {
  cursors: Cursors,
  query: string
}

export default function Pagination({ cursors, query } : PaginationProps){
  return (
    <Form method="get">
      <input defaultValue={query} name="q" hidden={true}/>
      <button name="cursor" type="submit" aria-label="previous" value={cursors.prev} disabled={!!!cursors.prev}>
        Prev
      </button>
      <button name="cursor" type="submit" aria-label="next" value={cursors.next} disabled={!!!cursors.next}>
        Next
      </button>
    </Form>
  )
}
