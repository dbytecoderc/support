import {
	Response,
	NextFunction,
} from "express";
import Utils from "../utils/utils";

export default class Validator {
	/**
	 * validator for request Query
	 * @param {Object} schema - validation schema
	 * @param {Object} res - Express response object
	 * @param {Object} next - pass control to the next handler
	 * @returns {Object} Error Response if validation fails
	 */
	static validateRequest(schema: any, slice: string): any {
		return async (request: any, response: Response, next: NextFunction) => {
			try {
				await schema.validateAsync(request[slice], {
					abortEarly: false,
					language: {
						key: "{{key}}",
					},
				});
				next();
			} catch (error) {
				const validationErrors: any = Utils.parseValidationErrors(
					error.details
				);

				return response.status(422).json({
					success: false,
					message: "Validation Errors",
					errors: validationErrors,
				});
			}
		};
	}
}
