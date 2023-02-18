import { PUBLIC_API_URL } from "$env/static/public";

export function fetchApi(url, options = {}) {
    const defaults = {
      credentials: 'include',
      headers: (options.body) ? {'Content-Type': 'application/json'} : undefined
    };
  
    const fetchOptions = Object.assign({}, defaults, options);
    const fullUrl = `${PUBLIC_API_URL}${url}`;

    return fetch(fullUrl, fetchOptions);
}