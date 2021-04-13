"use strict";

import appRoot from "app-root-path";
import * as winston from "winston";

const LOG_FILE_PATH = `${appRoot}/logs/app.log`;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

// define the custom settings for each transport (file, console)
const options: winston.LoggerOptions = {
	silent: process.env.NODE_ENV === 'test' ? true : false,
	transports: [
		new winston.transports.Console({
			level: process.env.NODE_ENV === "production" ? "error" : "debug",
			handleExceptions: true,
		}),
		new winston.transports.File({
			filename: LOG_FILE_PATH,
			level: "debug",
			maxsize: MAX_FILE_SIZE,
			maxFiles: MAX_FILES,
      handleExceptions: true,
		}),
	],
};

// instantiate a new Winston Logger with the settings defined above
let logger = winston.createLogger(options);

export const stream = {
	write: (message: any) => {
		logger.info(message);
	},
};

export default logger;
