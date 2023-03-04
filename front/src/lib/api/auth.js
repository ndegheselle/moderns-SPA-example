import { fetchApi, ApiError } from "./api.js";

export function login(username, password)
{
    return fetchApi(`/auth/login`, {
        method: "post",
        body: { username, password },
        ignoreRefresh: true
    })
        .then(async function (response) {
            return response.decodedBody;
        });
}

export function refresh()
{
    return fetchApi(`/auth/refresh`, {
        method: "post",
        ignoreRefresh: true
    })
        .then(async function (response) {
            return response.decodedBody;
        });
}

export function logout()
{
    return fetchApi(`/auth/logout`, {
        method: "post"
    });
}