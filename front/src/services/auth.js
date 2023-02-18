import { fetchApi } from "./api.js";

export function login(username, password)
{
    return fetchApi(`/auth/login`, {
        method: "post",
        body: JSON.stringify({ username, password }),
    })
        .then(async function (response) {
            if (!response.ok) throw new Error(response.status);

            const user = await response.json();
            return user;
        });
}

export function refresh()
{
    return fetchApi(`/auth/refresh`, {
        method: "post"
    })
        .then(async function (response) {
            if (!response.ok) throw new Error(response.status);

            const user = await response.json();
            return user;
        });
}