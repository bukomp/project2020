import mariadb from 'mariadb';
import { CONFIG } from './config';

export let pool: mariadb.Pool;

export function initDB(): void {
  try {
    console.log('Initializing Db');
    pool = mariadb.createPool({ host: CONFIG.DB_HOST, user: CONFIG.DB_USER, password: CONFIG.DB_PWD });
    console.log('Initialization complete!');
  } catch (err) {
    console.log(err);
  }
}

export async function dbRequestTemplate<T>(request: Function): Promise<T> {
  try {
    const conn = await pool.getConnection();
    const response = await request(conn);
    if (conn) {
      conn.release();
    }
    return response;
  } catch (error) {
    throw error;
  }
}
