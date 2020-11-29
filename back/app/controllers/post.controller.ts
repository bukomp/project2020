import * as userService from '../services/db/user.service';
import * as tokenService from '../services/token.service';
import * as passwordService from '../services/password.service';

import { checkToken } from '../middlewares/token.middleware';
import { checkUser } from '../middlewares/user.middleware';

import { Router } from 'express';
import { UserToken } from '../models/token.interfaces';

const postRouter = Router();

postRouter.put('/update', checkToken, checkUser, async (req, res) => {
  const headers = req.headers;
  const query = req.query;
  const body = req.body;

  try {
    const token = headers.authorization;

    const decodedToken: UserToken = tokenService.decodeToken(token);

    const user = await userService.getById(decodedToken.userId);

    return res.status(200).json({
      token: tokenService.updateToken(token),
    });
  } catch (error) {
    console.error('Error happened in /user/(get)');
    res.status(500).send(error);
  }
});

export { postRouter };
