import { Router } from 'express';

import AuthController from './authentication.controller';
import Schemas from '../../utils/schema';
import Middlewares from '../../middleware';

const authRouter: Router = Router();

const { createUser, loginUser } = AuthController;
const {
  UserSchema: { signupSchema, loginSchema },
} = Schemas;
const {
  Validator: { validateRequest },
} = Middlewares;

authRouter.post(
  '/register',
  validateRequest(signupSchema(), 'body'),
  createUser,
);

authRouter.post('/auth', validateRequest(loginSchema(), 'body'), loginUser);

export default authRouter;
