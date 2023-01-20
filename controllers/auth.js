import userRepo from '../repository/user.js';

function login(req, res)
{
    if (!req.headers.authorization) return res.status(400).json({msg: "No login information provided."});
    
    let header = req.headers.authorization.split(' ');
    // Basic auth
    if (header[0] == 'Basic')
    {
        let basic = Buffer.from(header[1], 'base64').toString('utf8');
        let auth = basic.split(':');

        let user = userRepo.getByUsernamePassword(auth[0], auth[1]);
        if (!user) return res.status(401).json({msg: "Wrong creadentials."});

        // Session
        req.session.user = user;
        return res.status(200).json(user);
    }

    res.status(400).json({msg: "No supported authentification."});
}

function logout(req, res, next)
{
    if (req.session.user)
    {
        req.session.destroy();
        res.status(200).json({msg: "Logout successfully."});
    }
}

export default {
    login,
    logout
};