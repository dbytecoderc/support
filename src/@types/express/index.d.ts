import { Router, Request } from "express";

import { Document } from "mongoose";

interface CreateUserInput {
	name: string;
	email: string;
	password: string;
}

interface User extends Document {
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	admin: boolean;
}


declare global {
	namespace Express {
		interface Request {
			user: User;
		}
	}
}