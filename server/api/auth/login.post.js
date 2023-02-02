import jwt from 'jsonwebtoken'
import { ObjectId } from 'bson';
import { usersRepository } from '../../repositories/users.js';

export function createTokenCookie(event, user) {
    const token = jwt.sign({ user: {id: user.id} }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE });
    setCookie(event, 'token', token, {httpOnly: true});
}

export function createRefreshCookie(event, user) {
    const tokenId = ObjectId();

    usersRepository.saveRefreshTokenId(user.id, tokenId);

    const refreshToken = jwt.sign({ user, tokenId }, process.env.JWT_REFRESH_KEY, { expiresIn: process.env.JWT_REFRESH_EXPIRE });
    setCookie(event, 'refresh-token', refreshToken, {httpOnly: true });
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.username || !body.password) throw createError({ statusCode: 400, statusMessage: 'No login information provided.' });

    let user = await usersRepository.getByUsernamePassword(body.username, body.password);
    if (!user) throw createError({ statusCode: 400, statusMessage: 'Wrong creadentials.' });

    // Auth token
    createTokenCookie(event, user);
    // Refresh token
    if (body.rememberMe === true)
        createRefreshCookie(event, user);

    return user;
});