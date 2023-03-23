import jwt from 'jsonwebtoken';

import usersRepo from './usersRepo.js';

export function createAccessToken(user)
{
    return jwt.sign({ user: {id: user.id} }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE });
}

export async function createRefreshToken(user)
{
    const token = jwt.sign({ user: {id: user.id} }, process.env.JWT_REFRESH_KEY, { expiresIn: process.env.JWT_REFRESH_EXPIRE });
    await usersRepo.saveRefreshToken(user.id, token);
    return token;
}

export function decodeAccessToken(token)
{
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_KEY);
    }
    catch(e)
    { return null; }

    if (!decoded) return null;
    return decoded.user;
}

export function decodeRefreshToken(token)
{
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_REFRESH_KEY);
    }
    catch(e)
    { return null; }
    
    // If refresh token blacklisted
    if (!decoded || !usersRepo.checkRefreshToken(token, decoded)) return null;
    return decoded.user;
}