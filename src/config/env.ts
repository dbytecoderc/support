import * as dotenv from "dotenv";
import * as path from "path";
import { Environment } from "../@types/env";

dotenv.config({ path: path.join(__dirname, "../../.env") });

export const env = {
	NODE_ENV: process.env.NODE_ENV,
	REDIS_URL: process.env.REDIS_URL,
	PORT: process.env.PORT || null,
	APP_SECRET: process.env.APP_SECRET,
	MONGODB_URI: process.env.MONGODB_URI,
	MONGO_URI_TEST: process.env.MONGO_URI_TEST,
} as Environment;
