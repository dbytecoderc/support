import { Document } from "mongoose";

export interface CreateUserInput {
	name: string;
	email: string;
	password: string;
}

export interface User extends Document {
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	admin: boolean;
}
