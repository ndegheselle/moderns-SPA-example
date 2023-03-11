import { fetchApi } from "./api.js";

export function createAccount(account)
{
    return fetchApi(`/accountancy/accounts`, {
        method: "post",
        body: account
    });
}

export function getAccounts()
{
    return fetchApi(`/accountancy/accounts`);
}

export function getAccount(id) {
    return fetchApi(`/accountancy/accounts/${id}`);
}

export function deleteAccount(id) {
    return fetchApi(`/accountancy/accounts/${id}`, {method: "delete"});
}

export function updateAccount(account)
{
    return fetchApi(`/accountancy/accounts/${account.id}`, {method: "put", body: account});
}

export function getTransactions(accountId)
{
    return fetchApi(`/accountancy/accounts/${accountId}/transactions`);
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