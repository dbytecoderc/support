import { Router } from 'express';

import app from './App';

const appRouter: Router = Router();

appRouter.get('/', app);

export default appRouter;
