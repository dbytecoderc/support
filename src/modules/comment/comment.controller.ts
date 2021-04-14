// import { Response } from 'express';

// import CommentRepository from './comment.repository';
// import SupportRequestRepository from '../supportRequest/support-request.repository';
// import Utils from '../../utils/utils';

// const { errorHandler } = Utils;

// // interface CustomRequest extends RequestHandler {
// //   user: any;
// // }

// export default class SupportRequestController {
//   /**
//    * Returns success if registration was successful and error if not
//    * @name /comment/:supportRequestId POST
//    *
//    * @param request {Object} The request.
//    * @param response {Object} The response.
//    * @param req.body {Object} The JSON payload.
//    *
//    * @function
//    * @returns {Boolean} success
//    * @returns {string} message
//    */
//   static async createComment(request: any, response: Response): Promise<any> {
//     const { _id, admin } = request.user;

//     try {
//       const supportRequest = await SupportRequestRepository.getSupportRequest(
//         request.params.supportRequestId,
//       );

//       if (!supportRequest) {
//         return response.status(404).json({
//           success: false,
//           message: 'Support request not found',
//         });
//       }

//       if (!admin && supportRequest.owner._id.toString() !== _id.toString()) {
//         return response.status(406).json({
//           success: false,
//           message: "You can't comment on a support request you didn't create",
//         });
//       }

//       if (supportRequest.comments.length === 0 && !request.user.admin) {
//         return response.status(406).json({
//           success: false,
//           message: 'No support agent has responded to this request',
//         });
//       }

//       if (supportRequest.comments.length === 0 && request.user.admin) {
//         await SupportRequestRepository.updateSupportRequest(
//           supportRequest._id,
//           { status: 'INPROGRESS' },
//         );
//       }

//       const comment = await CommentRepository.createComment(
//         {
//           ...request.body,
//           owner: request.user._id,
//         },
//         supportRequest,
//       );

//       return response.status(201).json({
//         success: true,
//         message: 'Comment created successfully',
//         data: comment,
//       });
//     } catch (error) {
//       return errorHandler(error, 500, response);
//     }
//   }
// }
