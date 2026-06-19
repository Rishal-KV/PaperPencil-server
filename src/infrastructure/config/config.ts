import dotenv from "dotenv";
import path from "path";

// Load environment variables from src/.env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  DB_URL: process.env.db_url || process.env.DB_URL || "",
  JWT_SECRET: process.env.jwt_secret || process.env.JWT_SECRET || "",
  STRIPE_SECRET: process.env.stripe_secret || process.env.STRIPE_SECRET || "",
  EMAIL: {
    GMAIL: process.env.GMAIL || "",
    PASSWORD: process.env.PASSWORD || "",
    FROM: process.env.EMAIL || "",
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.cloud_name || process.env.CLOUD_NAME || "",
    API_KEY: process.env.api_key || process.env.API_KEY || "",
    API_SECRET: process.env.api_secret || process.env.API_SECRET || "",
  },
  PORT: process.env.PORT || 4000,
};

export default config;
