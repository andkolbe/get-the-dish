import * as React from 'react';
import Layout from '../components/Layout';
import api from '../utils/Api-service';
import { useState } from 'react';

const Contact = (props: ContactProps) => {

    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await api('/api/login', 'POST', { email, title, content });
        setEmail('');
        setTitle('');
        setContent('');
    }

    return (
        <Layout>
            <form className='form-group border p-4 shadow bg-white font-weight-bold'>
                <h4 className='mb-4'>Contact Me</h4>
                <input className='form-control bg-warning mb-4' placeholder='email@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                <input className='form-control bg-warning mb-4' placeholder='Subject' value={title} onChange={e => setTitle(e.target.value)} />
                <textarea className='form-control bg-warning mb-4' placeholder='Content' rows={10} value={content} onChange={e => setContent(e.target.value)} />
                <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
            </form>
        </Layout>
    );
}

interface ContactProps { }

export default Contact;