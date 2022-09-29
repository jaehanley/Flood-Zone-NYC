/**
 * Checks that response is valid, passes error if not
 * @param {Response} response 
 * @returns {Response}
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Get the JSON from a fetch request
 * @param {Response} response 
 * @returns {object}
 */
function parseJSON(response) {
  return response.json();
}

/**
 * 
 * @param {RequestInfo | URL} url 
 * @param {RequestInit | undefined} options 
 * @returns {Promise<object>}
 */
export default function getJSON(url, options) {
  return fetch(url, options)
  .then(checkStatus)
  .then(parseJSON);
}
