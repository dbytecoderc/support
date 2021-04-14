import { Response } from "express";
import logger from "../config/logger";

class Error {
	static handleError(
		errorMessage: string,
		statusCode: number,
		response: Response,
		error?: Error
	) {
		logger.error(error ? error.toString() : errorMessage);
		return response.status(statusCode).json({
			success: false,
			error: errorMessage,
		});
	}
}

export default Error;
