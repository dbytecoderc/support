import { Router, Application } from "express";

import appRouter from "./app";

const routes: Router[] = [];

const apiPrefix: string = `/api/v1`;

export default (app: Application) => {
	app.use(appRouter);
	routes.forEach((route: Router) => app.use(apiPrefix, route));
	return app;
};
