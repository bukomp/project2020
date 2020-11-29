import sequelize from 'sequelize';
import { CONFIG } from './config';

export let db: sequelize.Sequelize;

export async function initDB(): Promise<void> {
  try {
    console.log('Initializing Db');
    db = new sequelize.Sequelize('project2020_1', CONFIG.DB_USER, CONFIG.DB_PWD, {
      host: CONFIG.DB_HOST,
      dialect: 'mariadb',
      timezone: 'Etc/GMT0', //for writing to database
    });

    try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    console.log('Initialization complete!');
  } catch (err) {
    console.log(err);
  }
}
