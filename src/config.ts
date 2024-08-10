import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const APP_SECRET = process.env.APP_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SLLCERT = process.env.SLLCERT;
const PROXY = process.env.PROXY;

export {
    PORT,
    APP_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    SLLCERT,
    PROXY
}
