/**
 * HTTP GET request.
 *
 * @export
 * @param {string} url
 * @return data
 */
export async function get<T>(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  const data = response.json() as unknown;
  return data as T;
}
