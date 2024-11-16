import Port from "./Port"

export default function Host({host} : any){
  return (
    <div className="host" key={host.ip}>
      <hr/>
      <h3 className="text-sky-500"> {host.ip}{}</h3>
      {host.services.map((service: any) => {
        return <Port host={host} service={service} />
      })}
    </div>
  )
}
