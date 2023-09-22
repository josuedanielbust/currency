// Services constants
export const PORT: number = parseInt(process.env.PORT || "3001");
export const REDIS_HOST: string = process.env.REDIS_HOST || "localhost";

// API constants
export const API_URL: string = process.env.API_URL || "";
export const API_KEY: string = process.env.API_KEY || "";

// Currencies constants
export const CURRENCY_FROM: string = process.env.CURRENCY_FROM || "USD";
export const CURRENCY_TO: string = process.env.CURRENCY_TO || "BRL";
