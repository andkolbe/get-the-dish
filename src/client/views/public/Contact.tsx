import * as React from 'react';
import Layout from '../../components/Layout';
import api from '../../utils/Api-service';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Contact = (props: ContactProps) => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await api('/api/contact', 'POST', { email, title, content });
        // send a message to display on home that the message was sent
        history.push('/');
    }

    return (
        <Layout>
            <form className='form-group border p-4 shadow bg-white font-weight-bold'>
                <h4 className='mb-4'>Contact Me</h4>
                <label htmlFor='email'>Your Email Address</label>
                <input className='form-control bg-warning input-shadow mb-4' id='email' placeholder='email@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                <label htmlFor='email'>Subject</label>
                <input className='form-control bg-warning input-shadow mb-4' value={title} onChange={e => setTitle(e.target.value)} />
                <label htmlFor='email'>Content</label>
                <textarea className='form-control bg-warning input-shadow mb-4' rows={10} value={content} onChange={e => setContent(e.target.value)} />
                <button className='btn btn-primary btn-shadow' onClick={handleSubmit}>Submit</button>
            </form>
        </Layout>
    );
}

interface ContactProps { }

export default Contact;