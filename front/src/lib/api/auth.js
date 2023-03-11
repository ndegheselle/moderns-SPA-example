import { fetchApi, ApiError } from "./api.js";

export function login(username, password)
{
    return fetchApi(`/auth/login`, {
        method: "post",
        body: { username, password },
        ignoreRefresh: true
    });
}

export function refresh()
{
    return fetchApi(`/auth/refresh`, {
        method: "post",
        ignoreRefresh: true
    });
}

export function logout()
{
    return fetchApi(`/auth/logout`, {
        method: "post"
    });
}