import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import dbconnect from './config/connection.db';
import morgan from 'morgan';

import modules from './modules';
import seedData from './database/seeders/seeder';

const app: Application = express();

const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API routes
modules(app);

// catch all routers
app.use('*', (request: Request, response: Response) => {
  return response.status(404).json({
    message: 'Not Found. Use /api/{app version} to access the Api',
  });
});

dbconnect().then(async () => {
  if (process.env.NODE_ENV !== 'test') {
    await seedData();
  }
  if (!module.parent) {
    app.listen(PORT, () => {
      console.log(
        `Server running on ${process.env.NODE_ENV} environment, on port ${
          PORT || 5000
        }`,
      );
    });
  }
});

export default app;
