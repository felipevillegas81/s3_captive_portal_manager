import dotenv from 'dotenv'
dotenv.config()

export default {
    APP_PORT: process.env.PORT || 3000,
    SECRET_SESSION_KEY: process.env.SECRET_SESSION_KEY,
    JWT_SECRET: process.env.JWT_SECRET,

    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
}