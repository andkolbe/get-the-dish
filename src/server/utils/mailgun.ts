import config from '../config';
//@ts-ignore
import * as inlineCSS from 'inline-css';
import * as mailgunLoader from 'mailgun-js';

const mailgun = mailgunLoader({ apiKey: config.keys.mailgun, domain: config.keys.mailgun_domain })

const template = `
<div>
    <style>
        h1 { color: #8094DE },
        body { background-color: #edf2f2 }
    </style>

    <h1>Welcome to Get the Dish!</h1>

    <h2>Thank you for signing up to Get the Dish! Here, people can together and post about their favorite dishes.</h2>
    <h3>I only started coding a few months ago, so any 
    feedback on the design or functionality would be greatly appreciated. Just drop it in the Contact form. Have fun!</h3>
<div>
`;

export const welcomeEmail = async (to: string, from: string) => {
    const html = await inlineCSS(template, { url: 'fake' }); // eventually change to get the dish url
    const data = {
        to, 
        from,
        html
    }
    return mailgun.messages().send(data);
}

export const contactEmail = async (to: string, from: string, subject: string, content: string) => {
    const data = {
        to, 
        from,
        subject,
        text: content
    }
    return mailgun.messages().send(data);
}

