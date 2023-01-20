const testUser = {
    username: "test",
    password: "test123"
}

function getByUsernamePassword(username, password)
{
    console.log(username, password);
    if (testUser.username == username && testUser.password == password)
    {
        return {
            id: 1,
            username: "test"
        }
    }
    return null;
}

export default {
    getByUsernamePassword
};