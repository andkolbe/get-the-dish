import nodemailer from 'nodemailer';


const transport = nodemailer.createTransport({
    host: 'localhost',
    port: 3000,
    secure: true,
    auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
    }
});