import express, { json } from 'express';
import cors from 'cors';
import mariadb from 'mariadb';
import dotenv from 'dotenv';

// Reeds .env file and creates global variables
dotenv.config();
import { CONFIG } from './utils/config';
import * as db from './utils/db';

// Routers
import { mainRouter } from './controllers/main.controller';
import { userRouter } from './controllers/user.controller';

async function startServer(): Promise<void> {
  console.log('\nInitializing server...');

  db.initDB();

  console.log('\nDataBase connected!');

  const app = express();

  app.use(json());
  app.use(cors());

  /**
   * If server is in production mode all requests are
   *  redirected to secured connection port
   */
  app.use((req, res, next) => {
    if (req.secure || CONFIG.NODE_ENV === 'development') {
      next();
    } else {
      return res.redirect('https://' + req.headers.host + req.url);
    }
  });

  // *** Middleware ***

  // TODO: Create middleware for user token checking

  // ******************

  // *** Controllers ***
  // !every route must contain checkToken() middleware, except login/registration routes

  // ***************

  app.use('', mainRouter);

  app.listen(CONFIG.PORT, () => {
    console.log(`\nApp is listening to port: ${CONFIG.PORT}`);
  });
}

startServer();
