export function formatOutput(data: any, pretty: boolean = true): string {
  if (pretty) {
    return JSON.stringify(data, null, 2);
  }
  return JSON.stringify(data);
}
