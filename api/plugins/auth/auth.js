import ms from "ms";
import { usersRepository } from "../../models/users.js";
import { createAccessToken, createRefreshToken, decodeRefreshToken } from "../../services/auth.js";

const cookieAccessOptions = {httpOnly: true, sameSite: "Lax", path: "/", maxAge: ms(process.env.JWT_EXPIRE)};
const cookieRefreshOptions = {httpOnly: true, sameSite: "Lax", path: "/auth/refresh", maxAge: ms(process.env.JWT_REFRESH_EXPIRE)};

async function login(req, reply)
{
    if (!req.body.username || !req.body.password) return reply.status(400).send({ message: "No login information provided." });

    let user = await usersRepository.getByUsernamePassword(req.body.username, req.body.password);
    if (!user) return reply.status(400).send({ message: "Wrong creadentials." });

    // Tokens
    reply.setCookie('access-token', createAccessToken(user), cookieAccessOptions);
    reply.setCookie('refresh-token', await createRefreshToken(user), cookieRefreshOptions);
    
    return reply.status(200).send({ user });
}

function logout(req, reply)
{
    if (!req.currentUser) return reply.status(401).send({ msg: "Not logged in." });

    reply.clearCookie('access-token', cookieAccessOptions);
    reply.clearCookie('refresh-token', cookieRefreshOptions);

    return reply.status(200).send({ msg: "Logout successfully." });
}

async function refresh(req, reply)
{
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) return reply.status(400).send({ message: "No refresh token provided." });

    const user = decodeRefreshToken(refreshToken);
    if (!user) return reply.status(400).send({ message: "Invalid refresh token." });

    // Tokens
    reply.setCookie('access-token', createAccessToken(user), cookieAccessOptions);
    reply.setCookie('refresh-token', await createRefreshToken(user), cookieRefreshOptions);

    return reply.status(200).send({ 
        user: await usersRepository.getById(user.id) 
    });
}

export default async function(app, opts) {
    app.post("/login", login);
    app.post("/logout", logout);
    app.post("/refresh", refresh);
};