import { ServerConfig } from '../models/server.interfaces';

export const CONFIG: ServerConfig = {
  DB_URL: process.env.DB_URL,
  PORT: +process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  SECRET: process.env.SECRET,
  TOKEN_ALIVE_HOURS: +process.env.TOKEN_ALIVE_HOURS,
};
