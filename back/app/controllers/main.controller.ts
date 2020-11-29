import { Router } from 'express';

import * as userService from '../services/db/user.service';
import * as tokenService from '../services/token.service';
import * as passwordService from '../services/password.service';

import { checkToken } from '../middlewares/token.middleware';
import { checkUser } from '../middlewares/user.middleware';

import { UserToken } from '../models/token.interfaces';
import { User } from '../models/general.interfaces';

const mainRouter = Router();

mainRouter.post('/login', async (req, res) => {
  const headers = req.headers;
  const query = req.query;
  const body = req.body;

  try {
    const token = headers.authorization;

    if (token) {
      // Login by token

      if (tokenService.tokenIsExpired(token)) {
        // Token is expired
        return res.status(403).json({
          error: 'Authorization Token is outdated',
        });
      }

      try {
        // Token could be verified by secret
        tokenService.decodeToken(token);
      } catch (error) {
        return res.status(403).json({
          error: "Authorization Token couldn't be verified",
        });
      }

      const decodedToken = tokenService.decodeToken(token);

      const user = await userService.getById(decodedToken.userId);

      if (!user) {
        return res.status(404).json({
          error: "User with id from token doesn't exist, try logging in again or with other credentials",
        });
      }

      return res.status(200).json({ token: tokenService.updateToken(token), user });
    } else {
      if (!body.username && !body.email) {
        return res.status(403).json({
          error: 'Request must contain email or username',
        });
      }

      const user = await userService.findUserByUsernameOrEmail(body?.username, body?.email);

      if (user) {
        // Verifying password
        const passwordIsVerified = passwordService.verifyPassword(body.password, user.password);

        // Password was not verified
        if (!passwordIsVerified) {
          return res.status(403).json({
            error: 'Wrong password',
          });
        }

        const newToken: string = tokenService.generateToken(user.id);

        return res.status(200).json({
          token: newToken,
          user,
        });
      } else {
        return res.status(404).json({
          error: "User with given username/email wasn't found",
        });
      }
    }
  } catch (error) {
    console.error('Error happened in /user/login');
    res.status(500).send(error);
  }
});

mainRouter.post('/register', async (req, res) => {
  const headers = req.headers;
  const query = req.query;
  const body = req.body;

  try {
    // Check if email is invalid
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(body.email)) {
      return res.status(400).json({ error: 'Email must be valid' });
    }

    // Check if username is longer than 3 characters
    if (body.username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }

    // Check if password is longer than 3 characters
    if (body.password.length < 3) {
      return res.status(400).json({ error: 'Password must be at least 3 characters long' });
    }

    // Checks if user with given username exists
    let user = await userService.findUserByUsernameOrEmail(body.username);
    if (user) {
      return res.status(409).json({
        error: 'User already exists with given username',
      });
    }

    // Checks if user with given email exists
    user = await userService.findUserByUsernameOrEmail(undefined, body.email);
    if (user) {
      return res.status(409).json({
        error: 'User already exists with given email',
      });
    }

    let newUser: User = {
      username: body.username,
      email: body.email,
      password: passwordService.encryptPassword(body.password),
    };

    newUser = await userService.create(newUser);

    const token = tokenService.generateToken(newUser.id);

    delete newUser.password;
    delete newUser.id;

    return res.status(200).json({ token, user: newUser });
  } catch (error) {
    console.error('Error happened in /user/login');
    res.status(500).send(error);
  }
});

mainRouter.get('/*', async (req, res) => {
  return res.sendStatus(404);
});

export { mainRouter };
