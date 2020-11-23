import * as userService from '../services/db/user.service';
import * as tokenService from '../services/token.service';
import * as passwordService from '../services/password.service';

import { checkToken } from '../middlewares/token.middleware';
import { checkUser } from '../middlewares/user.middleware';

import { Router } from 'express';
import { UserToken } from '../models/token.interfaces';

const userRouter = Router();

userRouter.get('/', checkToken, checkUser, async (req, res) => {
  const headers = req.headers;
  const query = req.query;

  try {
    const token = headers.authorization;

    const decodedToken: UserToken = tokenService.decodeToken(token);

    const user = await userService.getById(decodedToken.userId);
    delete user.passwordHash;

    return res.status(200).json({
      token: tokenService.updateToken(token),
      user,
    });
  } catch (error) {
    console.error('Error happened in /user/(get)');
    res.status(500).send(error);
  }
});

userRouter.put('/update', checkToken, checkUser, async (req, res) => {
  const headers = req.headers;
  const query = req.query;
  const body = req.body;

  try {
    const token = headers.authorization;

    const decodedToken: UserToken = tokenService.decodeToken(token);

    const user = await userService.getById(decodedToken.userId);

    // Verifying password
    const passwordIsVerified = passwordService.verifyPassword(body.currentPassword, user.passwordHash);

    // Password was not verified
    if (!passwordIsVerified) {
      return res.status(403).json({
        error: 'Wrong password',
      });
    }

    // Check if email is invalid
    if (body.email && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(body.email)) {
      return res.status(400).json({ error: 'Email must be valid' });
    }

    // Check if username is longer than 3 characters
    if (body.username && body.username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }

    // Check if password is longer than 3 characters
    if (body.password && body.password.length < 3) {
      return res.status(400).json({ error: 'Password must be at least 3 characters long' });
    }

    const fieldsToUpdate = {
      username: body.username,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      points: body.points,
      co2: body.co2,
      passwordHash: passwordService.encryptPassword(body.password),
    };

    const updatedUser = await userService.updateUser(decodedToken.userId, fieldsToUpdate);

    return res.status(200).json({
      token: tokenService.updateToken(token),
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error happened in /user/(get)');
    res.status(500).send(error);
  }
});

export { userRouter };
