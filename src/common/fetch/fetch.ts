// Don't polyfill fetch in order to avoid messing global scope for
// applications consuming this component.
import { fetch as fetchPolyfill } from "whatwg-fetch";

async function fetchWrapper<T>(
  url: RequestInfo,
  options?: RequestInit
): Promise<T> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetchPolyfill(url, options);
    return await response.json();
  } catch (e) {
    throw e;
  }
}

export default fetchWrapper;
