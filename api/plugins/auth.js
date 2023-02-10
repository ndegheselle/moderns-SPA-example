import { usersRepository } from "../models/users.js";
import { createAccessToken, createRefreshToken } from "../services/auth.js";

async function login(req, reply)
{
    if (!req.body.username || !req.body.password) return reply.status(400).send({ message: "No login information provided." });

    let user = await usersRepository.getByUsernamePassword(req.body.username, req.body.password);
    if (!user) return reply.status(400).send({ message: "Wrong creadentials." });

    // Access token
    reply.setCookie('access-token', createAccessToken(user), {httpOnly: true});
    
    // Refresh token
    if (req.body.rememberMe === true)
        reply.setCookie('refresh-token', createRefreshToken(user), {httpOnly: true});
    
    reply.status(200).send({ user });
}

function logout(req, reply)
{
    reply.clearCookie('access-token');
    reply.clearCookie('refresh-token');

    reply.status(200).send({ msg: "Logout successfully." });
}

function refresh(req, reply)
{

}

export default async function (fastify, opts) {
    fastify.post("/login", login);
    fastify.post("/logout", logout);
    fastify.post("/refresh", refresh);
};