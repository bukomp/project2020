import express from 'express';
import { decodeToken } from '../services/token.service';

import * as userService from '../services/db/user.service';

export async function checkUser(
  req: express.Request<any, any, any, any>,
  res: express.Response<any>,
  next: express.NextFunction
): Promise<express.Response<any> | void> {
  try {
    const token = req.headers.authorization;

    const decodedToken = decodeToken(token);
    const user = await userService.getById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({
        error: 'User does not exist',
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Something went wrong while checking user',
    });
  }
}
