import { Request, Response } from 'express';

import SupportRequestRepository from './support-request.repository';
// import Utils from '../../utils/utils';
import Error from '../../utils/Error';

export default class SupportRequestController {
  /**
   * Returns success if registration was successful and error if not
   * @name /support_request POST
   *
   * @param request {Object} The request.
   * @param response {Object} The response.
   * @param req.body {Object} The JSON payload.
   *
   * @function
   * @returns {Boolean} success
   * @returns {string} message
   */
  static async createSupportRequest(
    request: Request,
    response: Response,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const supportRequest = await SupportRequestRepository.createSupportRequest(
        {
          ...request.body,
          owner: request.user._id,
        },
      );

      response.status(201).json({
        success: true,
        message: 'Support request created successfully',
        data: supportRequest,
      });
    } catch (error) {
      return Error.handleError('Server error', 500, response, error);
    }
  }

  /**
   * Returns success if registration was successful and error if not
   * @name /support_request/:id PATCH
   *
   * @param request {Object} The request.
   * @param response {Object} The response.
   * @param req.body {Object} The JSON payload.
   * @param req.user {Object} The JSON payload containing user details
   *
   * @function
   * @returns {Boolean} success
   * @returns {string} message
   */
  static async updateSupportRequest(
    request: Request,
    response: Response,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const { _id } = request.user;

      const supportRequest = await SupportRequestRepository.getSupportRequest(
        request.params.id,
      );

      if (!supportRequest) {
        return Error.handleError('Support request not found', 400, response);
      }

      if (supportRequest.owner._id.toString() !== _id.toString()) {
        return Error.handleError('Not allowed', 400, response);
      }

      const updatedRequest = await SupportRequestRepository.updateSupportRequest(
        request.params.id,
        request.body,
      );

      return response.status(200).json({
        success: true,
        message: 'You have successfully updated this support request',
        data: updatedRequest,
      });
    } catch (error) {
      return Error.handleError('Server error', 500, response, error);
    }
  }

  /**
   * Returns success if registration was successful and error if not
   * @name /support_request/close_request/:id PATCH
   *
   * @param request {Object} The request.
   * @param response {Object} The response.
   * @param req.body {Object} The JSON payload.
   * @remarks
   * Only an admin has access to this route
   *
   * @function
   * @returns {Boolean} success
   * @returns {string} message
   */
  static async closeRequest(request: Request, response: Response): Promise<any> {
    try {
      const supportRequest = await SupportRequestRepository.getSupportRequest(
        request.params.id,
      );

      if (!supportRequest) {
        return Error.handleError('Support request not found', 400, response);
      }

      const updatedRequest = await SupportRequestRepository.updateSupportRequest(
        request.params.id,
        { ...request.body, completedAt: new Date() },
      );

      return response.status(200).json({
        success: true,
        message: 'You have successfully closed this support request',
        data: updatedRequest,
      });
    } catch (error) {
      return Error.handleError('Server error', 500, response, error);
    }
  }

  /**
   * Returns success if registration was successful and error if not
   * @name /support_request/:id GET
   *
   * @param request {Object} The request.
   * @param response {Object} The response.
   *
   * @function
   * @returns {Promise<void | Response<any, Record<string, any>>>} message
   */
  static async getSupportRequest(
    request: Request,
    response: Response,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const supportRequest = await SupportRequestRepository.getSupportRequest(
        request.params.id,
      );

      if (!supportRequest) {
        return Error.handleError('Support request not found', 400, response);
      }

      response.status(200).json({
        success: true,
        message: 'You have successfully retrieved this support request',
        data: supportRequest,
      });
    } catch (error) {
      return Error.handleError('Server error', 500, response, error);
    }
  }

  /**
   * Returns success if registration was successful and error if not
   * @name /support_request GET
   *
   * @param request {Object} The request.
   * @param response {Object} The response.
   *
   * @function
   * @returns {Promise<void | Response<any, Record<string, any>>>} message
   */
  static async getSupportRequests(
    request: Request,
    response: Response,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const { _id, admin } = request.user;
      let supportRequest;
      if (admin) {
        supportRequest = await SupportRequestRepository.getSupportRequests();
      } else {
        supportRequest = await SupportRequestRepository.getUserSupportRequests(
          _id,
        );
      }
      response.status(200).json({
        success: true,
        message: 'You have successfully fetched Support Requests',
        data: supportRequest,
      });
    } catch (error) {
      return Error.handleError('Server error', 500, response, error);
    }
  }

  // /**
  //  * Returns success if registration was successful and error if not
  //  * @name /download_report GET
  //  *
  //  * @param request {Object} The request.
  //  * @param response {Object} The response.
  //  *
  //  * @function
  //  * @returns {Boolean} success
  //  * @returns {string} message
  //  */
  // static async downloadReport(request: Request, response: Response) {
  //   try {
  //     const supportRequest = await SupportRequestRepository.getClosedSupportRequests();

  //     const currentDatetime = new Date();
  //     const lastMonth = currentDatetime.setMonth(
  //       currentDatetime.getMonth() - 1,
  //     );

  //     const lastMonthData = supportRequest.filter(
  //       (data) => data && lastMonth < data.completedAt,
  //     );

  //     const csvFields = [
  //       '_id',
  //       'comments',
  //       'status',
  //       'description',
  //       'owner',
  //       'createdAt',
  //     ];
  //     return downloadResource(
  //       response,
  //       'supportReport.csv',
  //       csvFields,
  //       lastMonthData,
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     return errorHandler(error, 500, response);
  //   }
  // }
}
