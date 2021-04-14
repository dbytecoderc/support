import { connect, connection, Mongoose } from "mongoose";
// import { MongoError } from 'mongodb';
import dotenv from "dotenv";
import logger from "./logger";
import { env } from "./env";

dotenv.config();

const { MONGODB_URI, MONGO_URI_TEST, NODE_ENV } = env;

const dbUrl: string = NODE_ENV === "test" ? MONGO_URI_TEST : MONGODB_URI;

connection.on("connected", () => {
	logger.info("Mongoose default connection is open");
});

connection.on("error", (err: Error) => {
	logger.info(err.message, err.stack);
});

connection.on("disconnected", () => {
	logger.info("Mongoose default connection is disconnected");
});

process.on("SIGINT", async () => {
	connection.close(() => {
		logger.info(
			"Mongoose default connection is disconnected due to application termination"
		);
		process.exit(0);
	});
});

const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
};

export default async () => (await connect(dbUrl, options)) as Mongoose;
