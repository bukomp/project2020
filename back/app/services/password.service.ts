import { CONFIG } from './../utils/config';
import bcrypt from 'bcryptjs';

const saltRounds = 10;

export function encryptPassword(password: string): string {
  try {
    return bcrypt.hashSync(password, saltRounds);
  } catch (error) {
    console.error('Error happened in encryptPassword function');
    throw error;
  }
}

export function verifyPassword(password: string, passwordOrig: string): boolean {
  try {
    return bcrypt.compareSync(password, passwordOrig);
  } catch (error) {
    console.error('Error happened in verifyPassword function');
    throw error;
  }
}
