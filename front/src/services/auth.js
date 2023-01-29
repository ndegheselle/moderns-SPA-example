import http from "./http.js"

function login(username, password, rememberMe)
{
    return http.post('/auth/login', {
        username, password, rememberMe
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        throw new Error(error.response.data.message);
    });
}

function logout()
{
    return http.post('/auth/logout')
    .catch(function (error) {
        throw new Error(error.response.data.message);
    });
}

function refresh()
{
    return http.put('/auth/refresh')
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        // Not authentificated
    });
}

export default {
    login,
    logout,
    refresh
}