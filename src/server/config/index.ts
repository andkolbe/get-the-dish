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
    },
    keys: {
        stripe: process.env.STRIPE_KEY,
        mailgun: process.env.MAILGUN_KEY,
        mailgun_domain: process.env.MAILGUN_DOMAIN,
        aws_key_id: process.env.AWS_KEY_ID,
        aws_secret_key: process.env.AWS_SECRET_KEY,
        yelp: process.env.YELP_API_KEY
    }
}