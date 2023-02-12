import bcrypt from 'bcrypt';

export const usersModel = null;
export const usersRepository = {
    getByUsernamePassword: async function(username, password) {
        return {username}
    },
    saveRefreshToken: async function(userId, token) {
        return;
    },
    checkRefreshToken: function(token) {
        return true;
    }
};