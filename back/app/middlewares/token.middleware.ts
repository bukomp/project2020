import express from 'express';
import { decodeToken, tokenIsExpired, tokenIsReadable } from '../services/token.service';

export function checkToken(
  req: express.Request<any, any, any, any>,
  res: express.Response<any>,
  next: express.NextFunction
): express.Response<any> | void {
  const token = req.headers.authorization;

  // Check if token is readable
  if (!tokenIsReadable(token)) {
    return res.status(403).json({
      error: 'Authorization Token is malformed',
    });
  }

  if (!token) {
    // Token wasn't sent
    return res.status(403).json({
      error: "Authorization Token wasn't provided",
    });
  }

  try {
    if (tokenIsExpired(token))
      // Token is expired
      return res.status(403).json({
        error: 'Authorization Token is outdated',
      });

    try {
      // Token could be verified by secret
      decodeToken(token);
      next();
    } catch (error) {
      return res.status(403).json({
        error: "Authorization Token couldn't be verified",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Something went wrong while checking token',
    });
  }
}
