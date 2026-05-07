const monitoredServices = [
  {
    id: "uptime",
    url: "http://monitor.home:3001/dashboard",
  },
  {
    id: "jackett",
    url: "http://monitor.home:9117",
  },
  {
    id: "tailscale",
    url: "https://login.tailscale.com/admin",
  },
];

export async function getServicesStatus() {
  const results = await Promise.all(
    monitoredServices.map(async (service) => {
      try {
        const response = await fetch(service.url, {
          method: "GET",
          headers: {
            "User-Agent": "Mozilla/5.0",
            Accept: "*/*",
          },
          signal: AbortSignal.timeout(5000),
        });
        return {
          id: service.id,
          url: service.url,
          online: response.status < 500,
        };
      } catch {
        return {
          id: service.id,
          url: service.url,
          online: false,
        };
      }
    }),
  );

  return results;
}
