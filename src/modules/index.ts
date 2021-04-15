import { Router, Application } from 'express';

import appRouter from './app';
import authRouter from './authentication';
import supportRequestRouter from './support-request';
// import commentRouter from './comment';

const routes: Router[] = [authRouter, supportRequestRouter];

const apiPrefix: string = `/api/v1`;

export default (app: Application) => {
  app.use(appRouter);
  routes.forEach((route: Router) => app.use(apiPrefix, route));
  return app;
};
