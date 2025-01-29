function checkStatus(response) {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

/**
 * Request JSON from a URL and return a promise
 * @param {string} url The URL to request
 * @param {RequestInit} options Options for the fetch request
 */
export default function getJSON(url, options) {
  return fetch(url, options)
  .then(checkStatus)
  .then(parseJSON);
}
