import { ServerConfig } from '../models/server.interfaces';

export const CONFIG: ServerConfig = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PWD: process.env.DB_PWD,
  PORT: +process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  SECRET: process.env.SECRET,
  TOKEN_ALIVE_HOURS: +process.env.TOKEN_ALIVE_HOURS,
  PATH_TO_STORE_IMAGES: process.env.PATH_TO_STORE_IMAGES,
  PATH_TO_STATIC: process.env.PATH_TO_STATIC,
};
