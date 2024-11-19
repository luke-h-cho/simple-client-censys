// too many properties to map out, and I have no clue which fields/properties are optional, so using any
export default function Port({host, service} : any){
  return (
    <div className="" key={`${host.ip+"_"+service.transport_protocol}-${service.port}/${service.service_name}`}>
      {`${service.port}/${service.service_name}`}
    </div>
  )
}
