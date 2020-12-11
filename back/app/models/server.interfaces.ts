export interface ServerConfig {
  DB_HOST: string;
  DB_USER: string;
  DB_PWD: string;
  PORT: number;

  /**
   * 'development' or 'production'
   */
  NODE_ENV: string;
  SECRET: string;
  TOKEN_ALIVE_HOURS: number;
  PATH_TO_STORE_IMAGES: string;
  PATH_TO_STATIC: string;
}
