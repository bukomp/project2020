import * as userService from '../services/db/user.service';
import * as tokenService from '../services/token.service';

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
    delete user.password;
    delete user.id;

    return res.status(200).json({
      token: tokenService.updateToken(token),
      user,
    });
  } catch (error) {
    console.error('Error happened in /user/(get)');
    res.status(500).send(error);
  }
});

export { userRouter };
