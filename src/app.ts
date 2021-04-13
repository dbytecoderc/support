// Package Imports
import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

// File Imports
import { stream } from "./config/logger";
import modules from "./modules";
import dbconnect from "./config/connection";
import { env } from "./config";
import logger from "./config/logger";

const app: Application = express();

app.use(cors());
app.use(morgan("combined", { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
modules(app);

// catch all routers
app.use("*", (req, res) => {
	res.status(404).json({
		message: "Not Found. Use /api/{app version} to access the Api",
	});
});

dbconnect().then(async () => {
	// if (process.env.NODE_ENV !== 'test') {
	//   await seedData();
	// }

	logger.info(
		`Server running on ${process.env.NODE_ENV} environment, on port ${
			env.PORT || 5000
		}`
	);

	// if (!module.parent) {
	// app.listen(env.PORT, () => {
	// 	logger.info(
	// 		`Server running on ${process.env.NODE_ENV} environment, on port ${
	// 			env.PORT || 5000
	// 		}`
	// 	);
	// });
	// }
});

export default app;
