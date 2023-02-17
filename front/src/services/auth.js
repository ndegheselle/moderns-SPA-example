import { PUBLIC_API_URL } from "$env/static/public";

export function login(username, password, rememberMe)
{
    return fetch(`${PUBLIC_API_URL}/auth/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, rememberMe }),
    })
        .then(async function (response) {
            if (!response.ok) throw new Error(response.status);

            const user = await response.json();
            return user;
        });
}

export function refresh()
{
    return fetch(`${PUBLIC_API_URL}/auth/refresh`, {
        method: "post"
    })
        .then(async function (response) {
            if (!response.ok) throw new Error(response.status);

            const user = await response.json();
            return user;
        });
}