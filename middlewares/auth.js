function check(req, res, next)
{
    if (req.session.user)
        next();
    return res.status(403).json({msg: 'Unauthorised!'});
}

export default {
    check
}