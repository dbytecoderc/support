import { Router, Request } from "express";

import { Document } from "mongoose";

interface CreateUserInput {
	name: string;
	email: string;
	password: string;
}


interface SupportRequest extends Document {
	description: string;
	owner?: User;
	comments?: Comment[]
}

interface Comment extends Document {
	description: string;
	owner?: User | string
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