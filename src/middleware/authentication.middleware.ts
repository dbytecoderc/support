import { Request, Response, NextFunction } from 'express';
import UserRepository from '../modules/user/user.repository';
import Utils from '../utils/utils';
import Error from "../utils/Error";
// import logger from "../config/logger";

class AuthMiddleware {
  /**
   * validator for request Query
   * @param {Object} request - express request api
   * @param {Object} response - Express response object
   * @param {Object} next - pass control to the next handler
   */
   static async validateToken(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		try {
			const header = request.headers.authorization;
			if (header) {
				const bearer = header.split(" ");
				const token = bearer[1];
				const decoded: any = Utils.decodeToken(token);

        if(!decoded.sub){
          return Error.handleError("Not allowed", 400, response);
        }

        const user = await UserRepository.findByEmail(decoded.sub);
        if (user && user._id) {
          request.user = user;
          return next();
        } else {
          return Error.handleError("User does not exist", 400, response);
        }

			} else {
				return Error.handleError("Missing authorization header", 400, response);
			}
		} catch (error) {
			return Error.handleError("Server error", 500, response);
		}
	}

  /**
   * validator for request Query
   * @param {Object} request - express request api
   * @param {Object} response - Express response object
   * @param {Object} next - pass control to the next handler
   */
  static async adminAuth(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { admin } = request.user;

    if (!admin) {
      return Error.handleError("Unathorized access", 400, response);
    }
    
    return next();
  }
}

export default AuthMiddleware;
