import { config } from "dotenv";
import argsUtil from "./args.util.js";

const { env } = argsUtil;

const path = "./.env." + env;
config({ path })

const envUtil = {
    PORT: process.env.PORT,
    MONGO_LINK: process.env.MONGO_LINK,
    SECRET_KEY: process.env.SECRET_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    TOKEN_URL: process.env.TOKEN_URL,
    BASE_URL: process.env.BASE_URL,
    MODE: process.env.MODE,
    TWILIO_ID: process.env.TWILIO_ID,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN,
    TWILIO_PHONE: process.env.TWILIO_PHONE,
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
    NODEMAILER_EMAIL_APP_PASSWORD: process.env.NODEMAILER_EMAIL_APP_PASSWORD
};

export default envUtil;