/**
 * This function implements a feature to check if a url starts with http.
 * @param url A string that contains the url.
 * @returns url.
 */

export function startsWithHttp(url: string): string {
  if (url.startsWith("http")) {
    return url;
  }

  return `https://${url}`;
}
