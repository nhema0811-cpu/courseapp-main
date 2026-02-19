import dotenv from "dotenv";

dotenv.config();

const {
  JWT_USER_PASSWORD,
  JWT_ADMIN_PASSWORD,
  STRIPE_SECRET_KEY,
} = process.env;

// Only JWT is compulsory
if (!JWT_USER_PASSWORD || !JWT_ADMIN_PASSWORD) {
  throw new Error("Missing required JWT environment variables");
}

// Stripe is optional
export default {
  JWT_USER_PASSWORD,
  JWT_ADMIN_PASSWORD,
  STRIPE_SECRET_KEY: STRIPE_SECRET_KEY || "",
};
