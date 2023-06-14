const mapping: Record<string, string> = {
  companies: 'company',
  shareholders: 'shareholder',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
