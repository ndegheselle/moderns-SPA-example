import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

import { usersRepository, usersModel } from '../models/users.js';

function createTokenCookie(res, user) {
    const token = jwt.sign({ user: {_id: user._id} }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE });
    res.cookie('token', token, { httpOnly: true, sameSite: true });
}

function createRefreshCookie(res, user) {
    const tokenId = new mongoose.Types.ObjectId();

    usersRepository.saveRefreshTokenId(user._id, tokenId);

    const refreshToken = jwt.sign({ user, tokenId }, process.env.JWT_REFRESH_KEY, { expiresIn: process.env.JWT_REFRESH_EXPIRE });
    res.cookie('refresh-token', refreshToken, { httpOnly: true, sameSite: true });
}

function checkToken(token) {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        return decoded.user;
    } catch (err) {
        return null;
    }
}

async function checkRefreshToken(token)
{
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await usersModel.findById(decoded.user._id);

        // Token have already been user once
        if (user.refreshTokenId != decoded.tokenId) {
            // TODO : log a warning, user is probably being hacked
            return null;
        }

        return decoded.user;
    } catch (err) {
        return null;
    }
}

export default {
    createTokenCookie,
    createRefreshCookie,
    checkToken,
    checkRefreshToken
}