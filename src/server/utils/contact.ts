import config from '../config';
import * as mailgunLoader from 'mailgun-js';

const mailgun = mailgunLoader({ apiKey: config.keys.mailgun, domain: config.keys.mailgun_domain })

const sendEmail = (to: string, from: string, subject: string, content: string) => {
    const data = {
        to, 
        from,
        subject,
        text: content
    }
    return mailgun.messages().send(data);
}

export default sendEmail;