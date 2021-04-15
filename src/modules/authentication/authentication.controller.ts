import { Request, Response } from 'express';
import _ from 'underscore';

import Utils from '../../utils/utils';
import Error from '../../utils/Error';
import UserRepository from '../user/user.repository';
import { User } from '../../@types/express';

export default class AuthController {
  /**
   * Returns success if registration was successful and error if not
   * @name /register POST
   *
   * @param request {Object} The request.
   * @param response {Object} The response.
   * @param req.body {Object} The JSON payload.
   * @remarks
   * - This function accepts two parameters, request, and response
   * - this function accepts the email and password in the request body
   * - The "UserRepository.createUser" methods is an abstracted function that facilitates the process of creating a user
   *   You can follow the file trail to have a better understanding of how the function works.
   *
   * @function
   * @returns {Boolean} success
   * @returns {string} message
   *
   * @example
   * fetch("/register").send(body)nstructions" }
   */
  static async createUser(
    request: Request,
    response: Response,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const { email, password } = request.body;
      const isUserExists = await UserRepository.findByEmail(email);
      if (isUserExists) {
        return Error.handleError('Email already in use', 403, response);
      }

      const hashedPassword = await Utils.hashPassword(password);

      const user = await UserRepository.createUser({
        ...request.body,
        password: hashedPassword,
      });

      return response.status(201).json({
        message: 'User added successfully',
        token: Utils.generateAuthToken({ sub: user.email, admin: user.admin }),
        success: true,
      });
    } catch (error) {
      return Error.handleError('Server error', 500, response, error);
    }
  }

  /**
   * Returns success:true  and token if verification was successful and error if not
   * @name /auth POST
   * @param request {Object} The request.
   * @param response {Object} The response.
   * @param req.body {Object} The JSON payload.
   * @remarks
   * - This function accepts two parameters, request, and response
   *   You can follow the file trail to have a better understanding of how the function works.
   *
   * @function
   * @returns {Boolean} success
   *
   */
  static async loginUser(
    request: Request,
    response: Response,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const { email, password } = request.body;
      const user: User | null = await UserRepository.findByEmail(email);

      if (!user || !Utils.passwordsMatch(password, user.password)) {
        return Error.handleError('Invalid login details', 400, response);
      }

      const token: string = Utils.generateAuthToken({
        sub: user.email,
        admin: user.admin,
      });

      return response.status(200).json({ success: true, token });
    } catch (error) {
      return Error.handleError('Server error', 500, response, error);
    }
  }
}
