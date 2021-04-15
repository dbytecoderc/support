import { Request, Response } from 'express';

import CommentRepository from './comment.repository';
import SupportRequestRepository from '../support-request/support-request.repository';
// import Utils from '../../utils/utils';
import Error from '../../utils/Error';

export default class SupportRequestController {
  /**
   * Returns success if registration was successful and error if not
   * @name /comment/:supportRequestId POST
   *
   * @param request {Request} The request.
   * @param response {Response} The response.
   * @param req.body {Object} The JSON payload.
   *
   * @function
   * @returns {Promise<void | Response<any, Record<string, any>>> } message
   */
  static async createComment(
    request: Request,
    response: Response,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const { _id, admin } = request.user;
      const { supportRequestId } = request.params;

      const supportRequest = await SupportRequestRepository.getSupportRequest(
        supportRequestId,
      );

      if (!supportRequest) {
        return Error.handleError('Support request not found', 400, response);
      }

      if (!admin && supportRequest.owner._id.toString() !== _id.toString()) {
        return Error.handleError('Not allowed', 400, response);
      }

      if (supportRequest.comments.length === 0 && !request.user.admin) {
        return Error.handleError(
          'No support agent has responded to this request',
          400,
          response,
        );
      }

      if (supportRequest.comments.length === 0 && request.user.admin) {
        await SupportRequestRepository.updateSupportRequest(
          supportRequest._id,
          { status: 'INPROGRESS' },
        );
      }

      const comment = await CommentRepository.createComment(
        {
          ...request.body,
          owner: request.user._id,
        },
        supportRequest,
      );

      return response.status(201).json({
        success: true,
        message: 'Comment added successfully',
        data: comment,
      });
    } catch (error) {
      return Error.handleError('Server error', 500, response, error);
    }
  }
}
