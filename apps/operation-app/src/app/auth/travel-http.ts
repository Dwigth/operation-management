const backendPath = 'http://localhost:3333/api';

export function formatUrl({
  version,
  path,
}: {
  version: number;
  path: string;
}) {
  return `${backendPath}/v${version}/${path}`;
}

export function setTravelHeaders() {
  return {
    headers: {
      'x-travel-token': localStorage.getItem('access') ?? '',
    },
  };
}
