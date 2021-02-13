import * as React from 'react';
import Layout from '../../components/Layout';
import api from '../../utils/Api-service';
import { useState } from 'react';

const Contact = (props: ContactProps) => {

    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await api('/api/contact', 'POST', { email, title, content });
        setEmail('');
        setTitle('');
        setContent('');
    }

    return (
        <Layout>
            <form className='form-group border p-4 shadow bg-white font-weight-bold'>
                <h4 className='mb-4'>Contact Me</h4>
                <label htmlFor='email'>Your Email Address</label>
                <input className='form-control bg-warning mb-4' id='email' placeholder='email@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                <input className='form-control bg-warning mb-4' placeholder='Subject' value={title} onChange={e => setTitle(e.target.value)} />
                <textarea className='form-control bg-warning mb-4' placeholder='Content' rows={10} value={content} onChange={e => setContent(e.target.value)} />
                <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
            </form>
            <div>
                <h1>Welcome to Get the Dish!</h1>

                <h5>Thank you for signing up to Get the Dish! Here, people can together and post about their favorite dishes.</h5>
                <h6>I only started coding a few months ago, so any
                feedback on the design or functionality would be greatly appreciated. Just drop it in the Contact form. Thanks!</h6>
            </div>
        </Layout>
    );
}

interface ContactProps { }

export default Contact;