import { Form } from "@remix-run/react"

export default function SearchBar(){
  return(
    <Form method="get">
      <label> Query: </label>
      <input id="query" name="q" type="text" placeholder="Enter the Censys Query" size={40}/>
      <button type="submit" aria-label="search">
        Search
      </button>
    </Form>
  )
}
