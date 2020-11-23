export interface ServerConfig {
  DB_URL: string;
  PORT: number;

  /**
   * 'development' or 'production'
   */
  NODE_ENV: string;
  SECRET: string;
  TOKEN_ALIVE_HOURS: number;
}
