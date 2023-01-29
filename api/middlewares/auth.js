import authService from '../services/auth.js';
import {usersModel} from '../models/users.js';

async function check(req, res, next)
{
  let user = authService.checkToken(req.cookies.token);
  // Try using refresh token
  if (!user) user = refresh(req, res);
  if (!user) return res.status(401).json({ message: 'Not authenticated.' });

  req.user = await usersModel.findById(user._id);
  next();
}

function refresh(req, res)
{
  const user = authService.checkRefreshToken(req.cookies["refresh-token"]);
  if (!user) return null;

  // If valid re create all token
  authService.createTokenCookie(res, user);
  authService.createRefreshCookie(res, user);

  return user;
}

export default {
    check
}