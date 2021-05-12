export const deriveWebSocketPathToAbsolute = (path: string): string => {
  const loc = window.location;
  return `${loc.protocol === 'https:' ? 'wss:' : 'ws:'}//${loc.host}${path}`;
};
