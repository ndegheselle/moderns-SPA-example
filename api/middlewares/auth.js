import jwt from 'jsonwebtoken'
import authService from '../services/auth.js';

function check(req, res, next)
{
  let user = authService.checkToken(req.cookies.token, process.env.JWT_KEY);
  // Try using refresh token
  if (!user) user = refresh(req, res);
  if (!user) return res.status(401).json({ message: 'Not authenticated.' });

  next();
}

function refresh(req, res)
{
  const user = authService.checkToken(req.cookies["refresh-token"], process.env.JWT_REFRESH_KEY);
  if (!user) return null;

  // If valid re create all token
  authService.createTokenCookie(res, user);
  authService.createRefreshCookie(res, user);

  return user;
}

export default {
    check
}