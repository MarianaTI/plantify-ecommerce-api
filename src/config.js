import { config } from "dotenv";
config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const SECRET_KEY = process.env.SECRET_KEY;
export const port = process.env.port;