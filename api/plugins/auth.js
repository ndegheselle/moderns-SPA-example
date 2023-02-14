import { usersRepository } from "../models/users.js";
import { createAccessToken, createRefreshToken, decodeRefreshToken } from "../services/auth.js";

async function login(req, reply)
{
    if (!req.body.username || !req.body.password) return reply.status(400).send({ message: "No login information provided." });

    let user = await usersRepository.getByUsernamePassword(req.body.username, req.body.password);
    if (!user) return reply.status(400).send({ message: "Wrong creadentials." });

    // Tokens
    const token = createAccessToken(user);
    console.log("token", token);
    reply.setCookie('access-token', token, {httpOnly: true, sameSite: "lax", path: "/"});
    if (req.body.rememberMe === true)
        reply.setCookie('refresh-token', await createRefreshToken(user), {httpOnly: true, sameSite: "lax", path: "/auth/refresh"});
    
    return reply.status(200).send({ user });
}

function logout(req, reply)
{
    if (!req.currentUser) return reply.status(401).send({ msg: "Not logged in." });

    reply.clearCookie('access-token', {httpOnly: true, sameSite: "lax", path: "/"});
    reply.clearCookie('refresh-token', {httpOnly: true, sameSite: "lax", path: "/auth/refresh"});

    return reply.status(200).send({ msg: "Logout successfully." });
}

async function refresh(req, reply)
{
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) return reply.status(400).send({ message: "No refresh token provided." });

    const user = decodeRefreshToken(refreshToken);
    if (!user) return reply.status(400).send({ message: "Invalid refresh token." });

    // Tokens
    reply.setCookie('access-token', createAccessToken(user), {httpOnly: true});
    reply.setCookie('refresh-token', await createRefreshToken(user), {httpOnly: true, path: "/auth/refresh"});

    return reply.status(200).send({ 
        user: await usersRepository.getById(user.id) 
    });
}

export const autoPrefix = '/auth';
export default async function (app, opts) {
    app.post("/login", login);
    app.post("/logout", logout);
    app.post("/refresh", refresh);
};