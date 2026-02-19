import dotenv from "dotenv";

dotenv.config();

const {
  JWT_USER_PASSWORD,
  JWT_ADMIN_PASSWORD,
  STRIPE_SECRET_KEY,
} = process.env;

if (!JWT_USER_PASSWORD || !JWT_ADMIN_PASSWORD || !STRIPE_SECRET_KEY) {
  throw new Error("Missing required environment variables");
}

export default {
  JWT_USER_PASSWORD,
  JWT_ADMIN_PASSWORD,
  STRIPE_SECRET_KEY,
};
