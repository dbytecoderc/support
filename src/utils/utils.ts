import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { Parser } from 'json2csv';
// import dotenv from 'dotenv';

// import { Token } from './interfaces/utils';

export default class Utils {
  /**
   *
   * @function
   * This function generates a json token
   * @param payload {String}.
   * @return {String}
   */
  public static generateAuthToken(payload: any): string {
    return jsonwebtoken.sign({ ...payload }, process.env.APP_SECRET as string, {
      expiresIn: '7d',
    });
  }

  /**
   *
   * @function
   * This function decodes a json token
   * @param token {String}.
   * @return {String}
   */
  public static decodeToken(token: string): string | object {
    return jsonwebtoken.verify(
      token,
      process.env.APP_SECRET as string,
    ) as string;
  }

  /**
   *
   * @function
   * This encrypts a paasword input
   * @param password {String}.
   * @return {String}
   */
  public static async hashPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(
      parseInt(process.env.SALT_ROUND as string),
    );
    return bcrypt.hashSync(password, salt);
  }

  /**
   *
   * @function
   * This function verifies a password input
   * @param password {String}.
   * @return {Boolean}
   */
  public static passwordsMatch(rawPassword: string, hash: string): boolean {
    return bcrypt.compareSync(rawPassword, hash);
  }

  public static parseValidationErrors(errorDetails: any) {
    const validationErrors: any = {};

    errorDetails.forEach((errorItem: any) => {
      const index = errorItem.message.indexOf(' ');
      const key = errorItem.message
        .substr(0, index)
        .replace(/[^a-zA-Z_[\] ]/g, '');

      if (key in validationErrors) {
        validationErrors[key].push(
          errorItem.message.replace(/[^a-zA-Z0-9_[\] ]/g, ''),
        );
      } else {
        validationErrors[key] = [
          errorItem.message.replace(/[^a-zA-Z0-9_[\] ]/g, ''),
        ];
      }
    });

    return validationErrors;
  }

  /**
   *
   *
   * @export
   * @param {Response} response
   * @param {string} fileName
   * @param {string[]} fields
   * @param {any} data
   * @returns {Response<any, Record<string, any>>}
   */
  public static downloadResource(
    response: Response,
    fileName: string,
    fields: string[],
    data: any,
  ): Response<any, Record<string, any>> {
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);
    response.header('Content-Type', 'text/csv');
    response.header("Content-Disposition", `attachment;filename=${fileName}.csv`);
    response.attachment(fileName);
    return response.send(csv);
  }
}
