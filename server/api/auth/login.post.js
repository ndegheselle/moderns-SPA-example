import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

import { usersRepository } from '../../models/users.js';

export function createTokenCookie(event, user) {
    const token = jwt.sign({ user: {_id: user._id} }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE });
    
    setCookie(event, 'token', token, httpOnly=true);
}

export function createRefreshCookie(event, user) {
    const tokenId = new mongoose.Types.ObjectId();

    usersRepository.saveRefreshTokenId(user._id, tokenId);

    const refreshToken = jwt.sign({ user, tokenId }, process.env.JWT_REFRESH_KEY, { expiresIn: process.env.JWT_REFRESH_EXPIRE });
    res.cookie('refresh-token', refreshToken, { httpOnly: true, sameSite: true });
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