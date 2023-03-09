import { fetchApi } from "./api.js";

export function getAccounts()
{
    return fetchApi(`/accountancy/accounts`)
    .then(async function (response) {
        return response.decodedBody;
    });
}

export function getAccount(id) {
    return fetchApi(`/accountancy/accounts/${id}`)
    .then(async function (response) {
        return response.decodedBody;
    });
}

export function importFile(file, options)
{
    let data = new FormData();
    data.append('file', file);

    return fetchApi("/accountancy/accounts/import", {
        method: "post",
        body: data
    });
}