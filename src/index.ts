import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { AddressInfo } from "net";
import chalk from "chalk";
import { env } from "./config";
import app from "./app";
import logger from "./config/logger";

export const server: http.Server = http.createServer(app);

const port: number | null = env.PORT || 8080;

function onError(error: NodeJS.ErrnoException): void {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	switch (error.code) {
		case "EACCES":
			logger.error(`${bind} requires elevated privileges`);
			process.exit(1);
		case "EADDRINUSE":
			logger.error(`${bind} is already in use`);
			process.exit(1);
		default:
			throw error;
	}
}

function onListening(): void {
	const address = server.address() as AddressInfo;
	const bind =
		typeof address === "string" ? "pipe " + address : "port " + address.port;
	logger.info(chalk.bold.green("Server is listening on", bind));
}

server.on("error", onError);
server.on("listening", onListening);

server.listen(port, () => {
	logger.info(`Find me on http://localhost:${port}`);
});

export default server;
