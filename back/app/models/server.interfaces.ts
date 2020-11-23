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
}
