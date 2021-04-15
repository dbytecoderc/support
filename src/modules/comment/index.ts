import { Router } from 'express';

import CommentController from './comment.controller';
import Schemas from '../../utils/schema';
import Middlewares from '../../middleware';

const commentRouter: Router = Router();

const { createComment } = CommentController;

const {
  AuthMiddleware: { validateToken },
  Validator: { validateRequest },
} = Middlewares;

const {
  CommentSchema: { postComment, singleSupportRequestSchema },
} = Schemas;

commentRouter.post(
  '/comment/:supportRequestId',
  validateRequest(postComment(), 'body'),
  validateRequest(singleSupportRequestSchema(), 'params'),
  validateToken,
  createComment,
);

export default commentRouter;
