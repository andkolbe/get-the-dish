import * as dotenv from 'dotenv';

const envFound = dotenv.config();

if (!envFound) throw new Error('no .env file found');

export default {
    mysql: {
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        user: process.env.DB_USER,
        database: process.env.DB_SCHEMA
    },
    app: {
        prefix: process.env.API_PREFIX || '/api'
    },
    auth: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES
    }
}