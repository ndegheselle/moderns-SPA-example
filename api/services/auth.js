import jwt from 'jsonwebtoken';

import { usersRepository } from '../models/users.js';

export function createAccessToken(user)
{
    return jwt.sign({ user: {id: user.id} }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE });
}

export async function createRefreshToken(user)
{
    const token = jwt.sign({ user: {id: user.id} }, process.env.JWT_REFRESH_KEY, { expiresIn: process.env.JWT_REFRESH_EXPIRE });
    await usersRepository.saveRefreshToken(user.id, token);
    return token;
}

export function decodeAccessToken(token)
{
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) return null;
    return decoded.user;
}

export function decodeRefreshToken(token)
{
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_KEY);

    // If refresh token blacklisted
    if (!decoded || !usersRepository.checkRefreshToken(token, decoded)) return null;
    return decoded.user;
}