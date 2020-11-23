import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Reeds .env file and creates global variables
dotenv.config();
import { CONFIG } from './utils/config';

// Routers
import { mainRouter } from './controllers/main.controller';
import { userRouter } from './controllers/user.controller';

async function startServer() {
  console.log('\nInitializing server...');

  await mongoose
    .connect(CONFIG.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((err) => {
      console.log('There was an issue connecting to db');
      console.error(err);
      process.exit();
    });

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
