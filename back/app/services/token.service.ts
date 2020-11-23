import { UserToken } from '../models/token.interfaces';
import { CONFIG } from '../utils/config';
import jwt from 'jsonwebtoken';
import { addHoursToDate } from '../utils/universal';

export function generateToken(userId: string): string {
  try {
    const data: UserToken = {
      userId,
      exp: addHoursToDate(CONFIG.TOKEN_ALIVE_HOURS).getTime(),
    };

    return jwt.sign(data, CONFIG.SECRET);
  } catch (error) {
    console.error('Error happened in generateToken');
    throw error;
  }
}

export function decodeToken(token: string): UserToken {
  try {
    const decodedToken: UserToken = jwt.verify(token, CONFIG.SECRET) as UserToken;
    return decodedToken;
  } catch (error) {
    console.error('Error happened in decodeToken');
    throw error;
  }
}

export function tokenIsReadable(token: string): boolean {
  try {
    const decodedToken: UserToken = jwt.decode(token, { complete: true }) as UserToken;
    return decodedToken !== null ? true : false;
  } catch (error) {
    console.error('Error happened in tokenIsReadable');
    throw false;
  }
}

export function tokenIsExpired(token: string): boolean {
  try {
    const decodedToken: UserToken = jwt.decode(token) as UserToken;
    return new Date(decodedToken.exp) < new Date();
  } catch (error) {
    console.error('Error happened in tokenIsExpired');
    throw error;
  }
}

export function updateToken(token: string): string {
  try {
    const verifiedToken = jwt.verify(token, CONFIG.SECRET) as UserToken;
    return generateToken(verifiedToken.userId);
  } catch (error) {
    console.error('Error happened in decodeToken');
    throw error;
  }
}
