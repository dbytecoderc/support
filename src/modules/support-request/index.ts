import { Router } from 'express';

import SupportRequestController from './support-request.controller';
import Schemas from '../../utils/schema';
import Middlewares from '../../middleware';

const supportRequestRouter: Router = Router();

const {
  createSupportRequest,
  getSupportRequest,
  getSupportRequests,
  updateSupportRequest,
  closeRequest,
  downloadReport,
} = SupportRequestController;

const {
  AuthMiddleware: { 
    validateToken, 
    adminAuth 
  },
  Validator: { validateRequest },
} = Middlewares;

const {
  SupportRequestSchema: {
    createSupportRequestSchema,
    singleSupportRequestSchema,
  },
} = Schemas;

supportRequestRouter.post(
  '/support_request',
  validateRequest(createSupportRequestSchema(), 'body'),
  validateToken,
  createSupportRequest,
);

supportRequestRouter.get('/support_request', validateToken, getSupportRequests);

supportRequestRouter.get(
  '/support_request/:id',
  validateRequest(singleSupportRequestSchema(), 'params'),
  validateToken,
  getSupportRequest,
);

supportRequestRouter.patch(
  '/support_request/:id',
  validateRequest(singleSupportRequestSchema(), 'params'),
  validateRequest(createSupportRequestSchema(), 'body'),
  validateToken,
  updateSupportRequest,
);

supportRequestRouter.patch(
  '/support_request/close_request/:id',
  validateRequest(singleSupportRequestSchema(), 'params'),
  validateToken,
  adminAuth,
  closeRequest,
);


supportRequestRouter.get(
  '/download_report',
  validateToken,
  adminAuth,
  downloadReport,
);

export default supportRequestRouter;
