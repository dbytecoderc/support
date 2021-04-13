export interface Environment {
	NODE_ENV: string;
	REDIS_URL: string;
	PORT: number | null;
	APP_SECRET: string;
	MONGODB_URI: string, 
  MONGO_URI_TEST: string,
}