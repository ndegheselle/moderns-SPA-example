import http from "./http.js"

function login(username, password)
{
    return http.post('/auth/login', {
        username, password
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        throw new Error(error.response.data.message);
        // TODO : create alert
    });
}

function logout()
{
    return http.post('/auth/logout', {})
    .then(function (response) {
    }).catch(function (error) {
        throw new Error(error.response.data.message);
        // TODO : create alert
    });
}

export default {
    login,
    logout
}