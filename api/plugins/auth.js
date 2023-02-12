import { usersRepository } from "../models/users.js";
import { createAccessToken, createRefreshToken, decodeRefreshToken } from "../services/auth.js";

async function login(req, reply)
{
    if (!req.body.username || !req.body.password) return reply.status(400).send({ message: "No login information provided." });

    let user = await usersRepository.getByUsernamePassword(req.body.username, req.body.password);
    if (!user) return reply.status(400).send({ message: "Wrong creadentials." });

    // Tokens
    reply.setCookie('access-token', createAccessToken(user), {httpOnly: true});
    if (req.body.rememberMe === true)
        reply.setCookie('refresh-token', await createRefreshToken(user), {httpOnly: true, path: "/auth/refresh"});
    
    return reply.status(200).send({ user });
}

function logout(req, reply)
{
    reply.clearCookie('access-token');
    reply.clearCookie('refresh-token');

    return reply.status(200).send({ msg: "Logout successfully." });
}

function refresh(req, reply)
{
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) return reply.status(400).send({ message: "No refresh token provided." });

    const user = decodeRefreshToken(refreshToken);
    if (!user) return reply.status(400).send({ message: "Invalid refresh token." });

    // Tokens
    reply.setCookie('access-token', createAccessToken(user), {httpOnly: true});
    reply.setCookie('refresh-token', createRefreshToken(user), {httpOnly: true, path: "/auth/refresh"});

    return reply.status(200).send({ user });
}

export const autoPrefix = '/auth';
export default async function (fastify, opts) {
    fastify.post("/login", login);
    fastify.post("/logout", logout);
    fastify.post("/refresh", refresh);
};