import userRepo from '../repository/user.js';
import jwt from 'jsonwebtoken'

function login(req, res)
{
    if (!req.body.username || !req.body.password) return res.status(400).json({message: "No login information provided."});

    let user = userRepo.getByUsernamePassword(req.body.username, req.body.password);
    if (!user) return res.status(401).json({message: "Wrong creadentials."});

    const token = jwt.sign({ user: user }, process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRE});
    res.cookie('token', token, { httpOnly: true, sameSite: true });

    return res.status(200).json(user);
}

function logout(req, res, next)
{
    if (req.session.user)
    {
        req.session.destroy();
        res.status(200).json({message: "Logout successfully."});
    }
}

export default {
    login,
    logout
};