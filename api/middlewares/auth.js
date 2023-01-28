import jwt from 'jsonwebtoken'

function check(req, res, next)
{
    const token = req.cookies.token;
    if (!token) return res.status(401).json({message: 'Not authenticated.'});

    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded.user;
    } catch (err) {
      return res.status(401).json({
        message: 'Not authenticated.'
      });
    }
    next();
}

export default {
    check
}