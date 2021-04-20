//@ts-ignore
import * as inlineCSS from 'inline-css';
import * as FormData from 'form-data';
import * as Mailgun from 'mailgun.js';
import MailGun from 'mailgun.js';
import config from '../config';

const mailgun = new (<typeof MailGun>(<any>Mailgun))(<any>FormData).client({
    username: 'api',
    key: config.keys.mailgun
})

const template = `
<div>
    <style>
        h1 { color: #8094DE },
        body { background-color: #edf2f2 }
    </style>

    <h1>Welcome to Get the Dish!</h1>

    <h2>Thank you for signing up to Get the Dish! Here, people can come together and post about their favorite dishes.</h2>
    <h3>I only started coding a few months ago, so any 
    feedback on the design or functionality would be greatly appreciated. Just drop it in the Contact form. Have fun!</h3>
<div>
`;

export const welcomeEmail = async (to: string, from: string) => {
    const html = await inlineCSS(template, { url: 'https://get-the-dish.herokuapp.com/' }); 
    const data = {
        to, 
        from,
        html
    }
    return mailgun.messages.create(config.keys.mailgun_domain, data);
}

export const contactEmail = async (to: string, from: string, subject: string, content: string) => {
    const data = {
        to, 
        from,
        subject,
        text: content
    }
    return mailgun.messages.create(config.keys.mailgun_domain, data);
}

