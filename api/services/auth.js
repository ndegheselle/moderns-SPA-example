import jwt from 'jsonwebtoken'

function createTokenCookie(res, user) {
    // XXX : may want to pass only user._id
    const token = jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE });
    res.cookie('token', token, { httpOnly: true, sameSite: true });
}

function createRefreshCookie(res, user) {
    const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_KEY, { expiresIn: process.env.JWT_REFRESH_EXPIRE });
    res.cookie('refresh-token', refreshToken, { httpOnly: true, sameSite: true });
}

function checkToken(token, secret) {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, secret);
        return decoded.user;
    } catch (err) {
        return null;
    }
}

export default {
    createTokenCookie,
    createRefreshCookie,
    checkToken
}