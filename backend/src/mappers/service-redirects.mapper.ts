interface ServiceRedirect {
  name: string;
  url: string;
}

const serviceRedirects: ServiceRedirect[] = [
  {
    name: "Pi-hole",
    url: "http://pihole.home/admin/login",
  },
  {
    name: "jellyfin",
    url: "http://jelly.home:8096/",
  },
];

export const getServiceRedirectUrl = (serviceName: string): string | null => {
  const service = serviceRedirects.find(({ name }) => name === serviceName);

  return service?.url ?? null;
};
