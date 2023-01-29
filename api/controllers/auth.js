import { usersRepository } from '../models/users.js';
import authService from '../services/auth.js';

import jwt from 'jsonwebtoken'

async function login(req, res) {
    if (!req.body.username || !req.body.password) return res.status(400).json({ message: "No login information provided." });

    let user = await usersRepository.getByUsernamePassword(req.body.username, req.body.password);
    if (!user) return res.status(400).json({ message: "Wrong creadentials." });

    // Auth token
    authService.createTokenCookie(res, user);
    // Refresh token
    authService.createRefreshCookie(res, user);

    return res.status(200).json(user);
}

function logout(req, res) {
    if (req.user) {
        res.clearCookie("token");
        res.clearCookie("refresh-token");
        return res.status(200).json({ message: "Logout successfully." });
    }
}

function refresh(req, res) {
    // Refresh is done by the middleware
    return res.status(200).json({ message: "Refresh successfully." });
}


export default {
    login,
    logout,
    refresh
};