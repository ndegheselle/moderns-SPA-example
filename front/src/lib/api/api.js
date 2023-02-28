import { PUBLIC_API_URL } from '$env/static/public'

import { refresh } from "./auth.js";
import { goto } from "$app/navigation";
import { currentUser } from "../stores/main.js"

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function fetchApi(url, options = {}) {
  const defaults = {
    credentials: 'include',
    headers: (options.body) ? { 'Content-Type': 'application/json' } : undefined
  };

  const fetchOptions = Object.assign({}, defaults, options);
  const fullUrl = `${PUBLIC_API_URL}${url}`;

  return fetch(fullUrl, fetchOptions)
    .then(async (response) => {
      response.decodedBody = await response.json();
      return Promise.resolve(response);
    })
    .then((response) => {
      // Handle errors
      if (!response.ok) throw new ApiError(response.status, response.decodedBody.message);
      return Promise.resolve(response);
    })
    // Handle token error and use refresh token
    .catch(async (error) => {
      if (error.status == 401 && !options.ignoreRefresh) {
        try {
          console.log("Invalid access token, trying to refresh ...");
          const user = await refresh();
          currentUser.set(user);
          // Go back to original request
          return fetchApi(url, options);
        } catch (error) {
          // No refresh token
          currentUser.set(null);
          goto("/login");
          throw error;
        }
      }
    });
   
}