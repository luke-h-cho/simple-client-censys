// mock data used for testing

export const mockHost = {
  ip: '192.168.1.1',
  services: [
    { name: 'Service 1', port: 80, service_name: "http",
    transport_protocol: "tcp"},
    { name: 'Service 2', port: 443, service_name: "http",
    transport_protocol: "tcp"},
  ],
};

export const mockCensysSuccessRes = {
  code: 200,
  status: "OK",
  result: {
    total: 2,
    duration: 2000,
    hits: [
      { ip: "192.168.1.1" },
      { ip: "192.168.1.2" },
    ],
    links: ["link1", "link2"],
  },
};

export const mockCursors = {
  prev: "prev-link",
  next: "next-link",
};
