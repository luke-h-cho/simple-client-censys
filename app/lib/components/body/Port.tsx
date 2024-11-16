export default function Port({host, service} : any){
  return (
    <div className="" key={`${host.ip+"_"+service.transport_protocol}-${service.port}/${service.service_name}`}>
      {`${service.port}/${service.service_name}`}
    </div>
  )
}
